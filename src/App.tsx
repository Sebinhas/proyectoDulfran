import AppRoutes from "./routes/AppRoutes";
import { RouterProvider } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "react-tooltip/dist/react-tooltip.css";
import { PaymentProvider } from "./context/PaymentContext";

function App() {
  return (
    <PaymentProvider>
      <RouterProvider router={AppRoutes} />
      <ToastContainer closeOnClick={true} />
    </PaymentProvider>
  );
}

export default App;
