import { useQuery } from "@tanstack/react-query";
import { getAllBookings, getMyBookings } from "../api/bookingsApi";
import { useAuth } from "./useAuth";

export function useBookings() {
  const { token, user } = useAuth();

  return useQuery({
    queryKey: ["bookings", user?.role],
    queryFn: () =>
      user?.role === "operator" ? getAllBookings(token) : getMyBookings(token),
    enabled: !!token && !!user,
  });
}
