function BookingDetails({ booking, history }) {
  return (
    <section className="booking-details">
      <h1>{booking.title}</h1>
      <p>{booking.description}</p>

      <div className="booking-meta">
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
        <p>
          <strong>Contact:</strong> {booking.contactEmail}
        </p>
      </div>

      <section>
        <h2>Comments</h2>
        {booking.comments?.length ? (
          <ul>
            {booking.comments.map((comment) => (
              <li key={comment.id}>
                <strong>{comment.author}:</strong> {comment.text}
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}
      </section>

      <section>
        <h2>Status history</h2>
        {history?.length ? (
          <ul>
            {history.map((item) => (
              <li key={item.id}>
                {item.from
                  ? `${item.from} → ${item.to}`
                  : `Initial status: ${item.to}`}{" "}
                ({item.changedAt})
              </li>
            ))}
          </ul>
        ) : (
          <p>No history available.</p>
        )}
      </section>
    </section>
  );
}

export default BookingDetails;
