import AppRoutes from './routes/AppRoutes';
import { RouterProvider } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import 'react-tooltip/dist/react-tooltip.css';

function App() {
  return (
    <>
      <RouterProvider router={AppRoutes} />
      <ToastContainer closeOnClick={true} />
    </>
  );
}

export default App;
