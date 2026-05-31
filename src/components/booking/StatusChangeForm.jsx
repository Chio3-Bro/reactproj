import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getStatuses, updateBookingStatus } from "../../api/bookingsApi";
import { useAuth } from "../../hooks/useAuth";
import { useNotifications } from "../../hooks/useNotifications";

function StatusChangeForm({ bookingId }) {
  const { token } = useAuth();
  const { showNotification } = useNotifications();
  const queryClient = useQueryClient();

  const statusesQuery = useQuery({
    queryKey: ["booking-statuses"],
    queryFn: () => getStatuses(token),
    enabled: !!token,
  });

  const mutation = useMutation({
    mutationFn: (status) => updateBookingStatus(bookingId, { status }, token),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["booking", bookingId] });
      queryClient.invalidateQueries({
        queryKey: ["booking-history", bookingId],
      });
      queryClient.invalidateQueries({ queryKey: ["bookings"] });
      showNotification("Status updated", "success");
    },
    onError: () => {
      showNotification("Failed to update status", "error");
    },
  });

  if (statusesQuery.isLoading) return null;

  return (
    <form
      className="status-form"
      onSubmit={(e) => {
        e.preventDefault();
        const status = new FormData(e.currentTarget).get("status");
        mutation.mutate(status);
      }}
    >
      <label>
        Change status
        <select name="status" defaultValue="">
          <option value="" disabled>
            Select status
          </option>
          {statusesQuery.data?.map((status) => (
            <option key={status.id} value={status.code}>
              {status.label}
            </option>
          ))}
        </select>
      </label>

      <button type="submit" disabled={mutation.isPending}>
        {mutation.isPending ? "Updating..." : "Update status"}
      </button>
    </form>
  );
}

export default StatusChangeForm;
