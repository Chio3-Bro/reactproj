import { useQuery } from "@tanstack/react-query";
import { getBookingById, getBookingHistory } from "../api/bookingsApi";
import { useAuth } from "./useAuth";

export function useBookingDetails(id) {
  const { token } = useAuth();

  const bookingQuery = useQuery({
    queryKey: ["booking", id],
    queryFn: () => getBookingById(id, token),
    enabled: !!id && !!token,
  });

  const historyQuery = useQuery({
    queryKey: ["booking-history", id],
    queryFn: () => getBookingHistory(id, token),
    enabled: !!id && !!token,
  });

  return {
    bookingQuery,
    historyQuery,
  };
}
