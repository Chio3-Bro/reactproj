import { Link } from "react-router-dom";

function BookingCard({ booking }) {
  return (
    <article className="booking-card">
      <h3>{booking.title}</h3>
      <p>{booking.description}</p>
      <p>
        <strong>Resource:</strong> {booking.resource}
      </p>
      <p>
        <strong>Status:</strong> {booking.status}
      </p>
      <p>
        <strong>Priority:</strong> {booking.priority}
      </p>
      <p>
        <strong>Date:</strong> {booking.date}
      </p>
      <p>
        <strong>Time:</strong> {booking.timeSlot}
      </p>
      <Link to={`/bookings/${booking.id}`}>Open details</Link>
    </article>
  );
}

export default BookingCard;
