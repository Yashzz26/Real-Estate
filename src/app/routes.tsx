import { createBrowserRouter } from "react-router";
import { Root } from "./components/layout/Root";
import { DashboardLayout } from "./components/layout/DashboardLayout";
import { Home } from "./pages/Home";
import { Listings } from "./pages/Listings";
import { PropertyDetail } from "./pages/PropertyDetail";
import { About } from "./pages/About";
import { Contact } from "./pages/Contact";
import { Login } from "./pages/Login";
import { Signup } from "./pages/Signup";
import { Dashboard } from "./pages/dashboard/Dashboard";
import { MyProperties } from "./pages/dashboard/MyProperties";
import { Wishlist } from "./pages/dashboard/Wishlist";
import { Messages } from "./pages/dashboard/Messages";
import { Settings } from "./pages/dashboard/Settings";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "listings", Component: Listings },
      { path: "property/:id", Component: PropertyDetail },
      { path: "about", Component: About },
      { path: "contact", Component: Contact },
    ],
  },
  {
    path: "/login",
    Component: Login,
  },
  {
    path: "/signup",
    Component: Signup,
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children: [
      { index: true, Component: Dashboard },
      { path: "properties", Component: MyProperties },
      { path: "wishlist", Component: Wishlist },
      { path: "messages", Component: Messages },
      { path: "settings", Component: Settings },
    ],
  },
  {
    path: "*",
    Component: NotFound,
  },
]);
