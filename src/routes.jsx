import MainLayout from "./layouts/MainLayout";
import FindDoctorPage from "./pages/FindDoctorPage";
import HomePage from "./pages/HomePage";
import { MyBookingPage } from "./pages/MyBookingPage";

export const routes = [
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/find-doctors",
        element: <FindDoctorPage />,
      },
      {
        path: "/my-booking",
        element: <MyBookingPage />,
      },
      {
        path: "*",
        element: <div>404 not found</div>,
      },
    ],
  },
];
