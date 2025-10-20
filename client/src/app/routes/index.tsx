import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { HistoryPage } from "../../features/history/pages/HistoryPage";
import { RequestPage } from "../../features/requests/pages/RequestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RequestPage />,
  },
  {
    path: "/history",
    element: <HistoryPage />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
