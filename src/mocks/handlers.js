import { http, HttpResponse, delay } from "msw";
import {
  users,
  resources,
  priorities,
  statuses,
  bookings,
  comments,
  statusHistory,
} from "./data";

function getUserFromToken(request) {
  const authHeader = request.headers.get("Authorization");

  if (!authHeader) return null;

  const token = authHeader.replace("Bearer ", "");
  const userId = Number(token.replace("mock-token-", ""));
  return users.find((u) => u.id === userId) || null;
}

function enrichBooking(booking) {
  return {
    ...booking,
    resource:
      resources.find((r) => r.id === booking.resourceId)?.name || "Unknown",
    comments: comments.filter((c) => c.bookingId === booking.id),
    history: statusHistory.filter((h) => h.bookingId === booking.id),
  };
}

export const handlers = [
  http.post("/api/auth/login", async ({ request }) => {
    const body = await request.json();

    const user = users.find(
      (u) => u.email === body.email && u.password === body.password,
    );

    if (!user) {
      return HttpResponse.json(
        { message: "Invalid email or password" },
        { status: 401 },
      );
    }

    return HttpResponse.json({
      accessToken: `mock-token-${user.id}`,
      role: user.role,
    });
  }),

  http.get("/api/auth/me", ({ request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    return HttpResponse.json({
      id: user.id,
      email: user.email,
      role: user.role,
      name: user.name,
    });
  }),

  http.get("/api/resources", ({ request }) => {
    const user = getUserFromToken(request);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json(resources);
  }),

  http.get("/api/priorities", ({ request }) => {
    const user = getUserFromToken(request);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json(priorities);
  }),

  http.get("/api/booking-statuses", ({ request }) => {
    const user = getUserFromToken(request);
    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }
    return HttpResponse.json(statuses);
  }),

  http.get("/api/bookings", async ({ request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await delay(800);

    if (user.role !== "operator") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return HttpResponse.json(bookings.map(enrichBooking));
  }),

  http.get("/api/bookings/my", async ({ request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    await delay(800);

    const myBookings = bookings.filter((b) => b.userId === user.id);
    return HttpResponse.json(myBookings.map(enrichBooking));
  }),

  http.get("/api/bookings/:id", ({ params, request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const booking = bookings.find((b) => b.id === Number(params.id));

    if (!booking) {
      return HttpResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    if (user.role !== "operator" && booking.userId !== user.id) {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return HttpResponse.json(enrichBooking(booking));
  }),

  http.get("/api/bookings/:id/history", ({ params, request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const bookingId = Number(params.id);
    const booking = bookings.find((b) => b.id === bookingId);

    if (!booking) {
      return HttpResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    if (user.role !== "operator" && booking.userId !== user.id) {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    return HttpResponse.json(
      statusHistory.filter((h) => h.bookingId === bookingId),
    );
  }),

  http.post("/api/bookings", async ({ request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const body = await request.json();

    if (body.title?.toLowerCase().includes("server-error")) {
      return HttpResponse.json(
        { message: "Server error example" },
        { status: 500 },
      );
    }

    const newBooking = {
      id: bookings.length ? Math.max(...bookings.map((b) => b.id)) + 1 : 1,
      title: body.title,
      description: body.description,
      resourceId: Number(body.resourceId),
      priority: body.priority,
      status: "pending",
      userId: user.id,
      contactEmail: body.contactEmail,
      date: body.date,
      timeSlot: body.timeSlot,
      createdAt: new Date().toISOString(),
    };

    bookings.push(newBooking);
    statusHistory.push({
      id: statusHistory.length
        ? Math.max(...statusHistory.map((h) => h.id)) + 1
        : 1,
      bookingId: newBooking.id,
      from: null,
      to: "pending",
      changedAt: new Date().toISOString(),
    });

    return HttpResponse.json(enrichBooking(newBooking), { status: 201 });
  }),

  http.patch("/api/bookings/:id/status", async ({ params, request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "operator") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const booking = bookings.find((b) => b.id === Number(params.id));
    if (!booking) {
      return HttpResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    const body = await request.json();
    const oldStatus = booking.status;
    booking.status = body.status;

    statusHistory.push({
      id: statusHistory.length
        ? Math.max(...statusHistory.map((h) => h.id)) + 1
        : 1,
      bookingId: booking.id,
      from: oldStatus,
      to: body.status,
      changedAt: new Date().toISOString(),
    });

    return HttpResponse.json(enrichBooking(booking));
  }),

  http.post("/api/bookings/:id/comments", async ({ params, request }) => {
    const user = getUserFromToken(request);

    if (!user) {
      return HttpResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (user.role !== "operator") {
      return HttpResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const booking = bookings.find((b) => b.id === Number(params.id));
    if (!booking) {
      return HttpResponse.json(
        { message: "Booking not found" },
        { status: 404 },
      );
    }

    const body = await request.json();

    const newComment = {
      id: comments.length ? Math.max(...comments.map((c) => c.id)) + 1 : 1,
      bookingId: booking.id,
      author: user.name,
      text: body.text,
      createdAt: new Date().toISOString(),
    };

    comments.push(newComment);

    return HttpResponse.json(newComment, { status: 201 });
  }),
];
