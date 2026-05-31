import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBookingComment } from "../../api/bookingsApi";
import { useAuth } from "../../hooks/useAuth";
import { useNotifications } from "../../hooks/useNotifications";

function CommentForm({ bookingId }) {
  const { token } = useAuth();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (text) => addBookingComment(bookingId, { text }, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      showNotification("Comment added", "success");
    },
    onError: () => {
      showNotification("Failed to add comment", "error");
    },
  });

  return (
    <form
      className="comment-form"
      onSubmit={(e) => {
        e.preventDefault();
        const text = new FormData(e.currentTarget).get("text");
        mutation.mutate(text);
        e.currentTarget.reset();
      }}
    >
      <label>
        Add comment
        <textarea name="text" required />
      </label>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Sending..." : "Add comment"}
      </button>
    </form>
  );
}

export default CommentForm;
