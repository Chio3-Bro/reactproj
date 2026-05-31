import { useParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useBookingDetails } from "../hooks/useBookingDetails";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import BookingDetails from "../components/booking/BookingDetails";
import StatusChangeForm from "../components/booking/StatusChangeForm";
import CommentForm from "../components/booking/CommentForm";

function BookingDetailsPage() {
  const { id } = useParams();
  const { user } = useAuth();
  const { bookingQuery, historyQuery } = useBookingDetails(id);

  if (bookingQuery.isLoading || historyQuery.isLoading) return <Loader />;
  if (bookingQuery.isError) {
    return (
      <ErrorMessage
        message={
          bookingQuery.error?.response?.data?.message ||
          "Failed to load booking"
        }
      />
    );
  }

  return (
    <section className="page-section">
      <BookingDetails
        booking={bookingQuery.data}
        history={historyQuery.data || []}
      />

      {user?.role === "operator" && (
        <div className="operator-tools">
          <StatusChangeForm bookingId={id} />
          <CommentForm bookingId={id} />
        </div>
      )}
    </section>
  );
}

export default BookingDetailsPage;
