import { Outlet } from "react-router-dom";
import Header from "./Header";
import Notifications from "../ui/Notifications";

function PrivateLayout() {
  return (
    <>
      <Header />
      <Notifications />
      <main className="private-layout">
        <Outlet />
      </main>
    </>
  );
}

export default PrivateLayout;
