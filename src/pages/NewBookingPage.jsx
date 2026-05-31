import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { createBooking } from "../api/bookingsApi";
import { useAuth } from "../hooks/useAuth";
import { useNotifications } from "../hooks/useNotifications";
import BookingForm from "../components/booking/BookingForm";

function NewBookingPage() {
  const { token } = useAuth();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (formData) => createBooking(formData, token),
    onSuccess: (createdBooking) => {
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      showNotification("Booking created successfully", "success");
      navigate(`/bookings/${createdBooking.id}`);
    },
    onError: (error) => {
      showNotification(
        error?.response?.data?.message || "Failed to create booking",
        "error",
      );
    },
  });

  return (
    <section className="page-section">
      <h1>New Booking</h1>
      <BookingForm
        onSubmit={mutation.mutate}
        isSubmitting={mutation.isPending}
      />
    </section>
  );
}

export default NewBookingPage;
