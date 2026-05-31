import { NavLink } from "react-router-dom";
import { useAuth } from "../../hooks/useAuth";

function Header() {
  const { user, logout } = useAuth();

  return (
    <header className="header">
      <div className="header__brand">School Booking</div>

      <nav className="header__nav">
        <NavLink to="/bookings">Bookings</NavLink>
        {user?.role === "user" && (
          <NavLink to="/bookings/new">New booking</NavLink>
        )}
      </nav>

      <div className="header__user">
        <span>{user?.name}</span>
        <span className="badge">{user?.role}</span>
        <button onClick={logout}>Logout</button>
      </div>
    </header>
  );
}

export default Header;
