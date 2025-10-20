import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RequestPage } from "../../features/requests/pages/RequestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequestPage />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
