function EmptyState({ message = "Nothing found" }) {
  return <div className="empty-state">{message}</div>;
}

export default EmptyState;
