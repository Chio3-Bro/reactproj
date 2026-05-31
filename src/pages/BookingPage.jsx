import { useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { useBookings } from "../hooks/useBookings";
import Loader from "../components/ui/Loader";
import ErrorMessage from "../components/ui/ErrorMessage";
import EmptyState from "../components/ui/EmptyState";
import BookingList from "../components/booking/BookingList";
import StatusFilter from "../components/booking/StatusFilter";

function BookingPage() {
  const { data, isLoading, isError, error } = useBookings();
  const [searchParams] = useSearchParams();

  const selectedStatus = searchParams.get("status") || "";

  const filteredBookings = useMemo(() => {
    if (!data) return [];
    if (!selectedStatus) return data;
    return data.filter((booking) => booking.status === selectedStatus);
  }, [data, selectedStatus]);

  if (isLoading) return <Loader />;
  if (isError) {
    return (
      <ErrorMessage message={error?.response?.data?.message || error.message} />
    );
  }

  return (
    <section className="page-section">
      <div className="page-header">
        <h1>Bookings</h1>
        <StatusFilter />
      </div>

      {filteredBookings.length === 0 ? (
        <EmptyState message="No bookings found" />
      ) : (
        <BookingList bookings={filteredBookings} />
      )}
    </section>
  );
}

export default BookingPage;
