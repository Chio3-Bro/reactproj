export const users = [
  {
    id: 1,
    email: "user@example.com",
    password: "user123",
    role: "user",
    name: "Regular User",
  },
  {
    id: 2,
    email: "operator@example.com",
    password: "operator123",
    role: "operator",
    name: "Service Operator",
  },
];

export const resources = [
  { id: 1, name: "Projector" },
  { id: 2, name: "Computer Lab" },
  { id: 3, name: "Assembly Hall" },
];

export const priorities = [
  { id: 1, code: "low", label: "Low" },
  { id: 2, code: "medium", label: "Medium" },
  { id: 3, code: "high", label: "High" },
];

export const statuses = [
  { id: 1, code: "pending", label: "Pending" },
  { id: 2, code: "approved", label: "Approved" },
  { id: 3, code: "rejected", label: "Rejected" },
  { id: 4, code: "completed", label: "Completed" },
];

export let bookings = [
  {
    id: 1,
    title: "Projector for history lesson",
    description: "Need projector for presentation",
    resourceId: 1,
    priority: "medium",
    status: "pending",
    userId: 1,
    contactEmail: "user@example.com",
    date: "2026-05-20",
    timeSlot: "10:00 - 11:00",
    createdAt: "2026-05-17T08:00:00Z",
  },
  {
    id: 2,
    title: "Assembly hall reservation",
    description: "Need hall for school event",
    resourceId: 3,
    priority: "high",
    status: "approved",
    userId: 1,
    contactEmail: "user@example.com",
    date: "2026-05-25",
    timeSlot: "12:00 - 14:00",
    createdAt: "2026-05-17T09:00:00Z",
  },
];

export let comments = [
  {
    id: 1,
    bookingId: 1,
    author: "Service Operator",
    text: "We are checking the projector availability.",
    createdAt: "2026-05-17T08:30:00Z",
  },
];

export let statusHistory = [
  {
    id: 1,
    bookingId: 1,
    from: null,
    to: "pending",
    changedAt: "2026-05-17T08:00:00Z",
  },
  {
    id: 2,
    bookingId: 2,
    from: null,
    to: "approved",
    changedAt: "2026-05-17T09:00:00Z",
  },
];
