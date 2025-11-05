import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApprovalPage } from "../../features/approvals/pages/ApprovalPage";
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
  {
    path: "approvals",
    element: <ApprovalPage />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
