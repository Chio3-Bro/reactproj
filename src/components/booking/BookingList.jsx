import BookingCard from "./BookingCard";

function BookingList({ bookings }) {
  return (
    <div className="booking-list">
      {bookings.map((booking) => (
        <BookingCard key={booking.id} booking={booking} />
      ))}
    </div>
  );
}

export default BookingList;
