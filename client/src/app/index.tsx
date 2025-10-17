import { Toaster } from "react-hot-toast";
import { AppRoutes } from "./routes";

export const App = () => {
  return (
    <>
      <AppRoutes />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};
