import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApprovalPage } from "../../features/approvals/pages/ApprovalPage";
import { HistoryPage } from "../../features/history/pages/HistoryPage";
import { ChildHome } from "../../features/home/child/pages/ChildHome";
import { ParentHome } from "../../features/home/parent/pages/ParentHome";
import { RequestPage } from "../../features/requests/pages/RequestPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <ParentHome />,
  },
  {
    path: "/request",
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
  {
    path: "/child",
    element: <ChildHome />,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};
