import { Routes, Route, Navigate } from "react-router-dom";
import PublicLayout from "../components/layout/PublicLayout";
import PrivateLayout from "../components/layout/PrivateLayout";
import ProtectedRoute from "../components/auth/ProtectedRoute";

import LoginPage from "../pages/LoginPage";
import BookingPage from "../pages/BookingPage";
import NewBookingPage from "../pages/NewBookingPage";
import BookingDetailsPage from "../pages/BookingDetailsPage";
import NotFoundPage from "../pages/NotFoundPage";

function AppRouter() {
  return (
    <Routes>
      <Route element={<PublicLayout />}>
        <Route path="/login" element={<LoginPage />} />
      </Route>

      <Route element={<ProtectedRoute />}>
        <Route element={<PrivateLayout />}>
          <Route path="/bookings" element={<BookingPage />} />
          <Route path="/bookings/new" element={<NewBookingPage />} />
          <Route path="/bookings/:id" element={<BookingDetailsPage />} />
        </Route>
      </Route>

      <Route path="/" element={<Navigate to="/bookings" replace />} />
      <Route path="/not-found" element={<NotFoundPage />} />
      <Route path="*" element={<Navigate to="/not-found" replace />} />
    </Routes>
  );
}

export default AppRouter;
