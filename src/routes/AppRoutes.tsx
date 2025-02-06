import { createBrowserRouter, redirect } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper.ts';
// landing
const Home = lazy(() => import('../pages/Home/Home'));
const NotFound = lazy(() => import('../components/NotFound/NotFound.tsx'));

const SkeletonPrivateLayout = lazy(
  () => import('../layouts/Components/Skeleton/SkeletonPrivateLayout.tsx')
);
// layouts
const MainLayout = lazy(() => import('../layouts/MainLayout'));
const AuthLayout = lazy(() => import('../layouts/AuthLayout'));
const PrivateLayout = lazy(() => import('../layouts/PrivateLayout'));
// pages dashboard
// const Patients = lazy(() => import('../pages/Admin/Patients/Patients.tsx'));
const Profile = lazy(() => import('../pages/Global/Profile/Profile.tsx'));
const Loading = lazy(() => import('../components/LoadingSpinner/Loading.tsx'));
const Invoices = lazy(() => import('../pages/Financial/Invoices/Invoices.tsx'));
const Clients = lazy(() => import('../pages/Financial/Clients/Clients.tsx'));
const Users = lazy(() => import('../pages/Administrator/Users/Users.tsx'));
const Notifications = lazy(() => import('../pages/Global/Notifications/Notifications.tsx'));
const Pqr = lazy(() => import('../pages/Global/Pqr/Pqr.tsx'));
const PqrResponse = lazy(() => import('../pages/Global/PqrResponse/PqrResponse.tsx'));

const Pasarela = lazy(() => import('../pages/Pasarela/Pasarela.tsx'));
import { useAuthStore } from '../hooks/authStore.ts';
import Reports from '../pages/Global/Reports/Reports.tsx';
import Contracts from '../pages/Technical/Contracts/Contracts.tsx';
import Payments from '../pages/Clients/Payments/Payments.tsx';
import Binnacle from '../pages/Administrator/Binnacle/Binnacle.tsx';


// Agregamos un nuevo loader para verificar el rol de admin
const adminLoader = () => {
  const user = useAuthStore.getState().user;
  if (user?.role !== 'administrador') {
    return redirect('/404');
  }
  return null;
};

const financieroLoader = () => {
  const user = useAuthStore.getState().user;
  if (user?.role !== 'financiero') {
    return redirect('/404');
  }
  return null;
};

const clienteLoader = () => {
  const user = useAuthStore.getState().user;
  if (user?.role !== 'cliente') {
    return redirect('/404');
  }
  return null;
};

const tecnicoLoader = () => {
  const user = useAuthStore.getState().user;
  if (user?.role !== 'tecnico') {
    return redirect('/404');
  }
  return null;
};

const AppRoutes = createBrowserRouter([
  {
    path: '/',
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />
      },
      {
        path: 'auth',
        element: <AuthLayout />
      }
    ]
  },
  {
    path: '/dashboard',
    element: (
      <Suspense fallback={<SkeletonPrivateLayout />}>
        <PrivateLayout />
      </Suspense>
    ),
    children: [
      
      // {
      //   path: '/dashboard/pacientes',
      //   element: <Patients />
      // },

      {
        path: '/dashboard/profile',
        element: <Profile />
      },
      {
        path: '/dashboard/notifications',
        element: <Notifications />
      },
      {
        path: '/dashboard/pqr',
        element: <Pqr />
      },              
      // Rutas protegidas solo para admin
      {
        path: '/dashboard/invoices',
        element: <Invoices />,
        loader: financieroLoader
      },

      {
        path: '/dashboard/pqrResponse',
        element: <PqrResponse />
      },
      {
        path: '/dashboard/reports',
        element: <Reports />,
        loader: adminLoader || financieroLoader
      },
      {
        path: '/dashboard/users',
        element: <Users />,
        loader: adminLoader
      },
      {
        path: '/dashboard/clients',
        element: <Clients />,
        loader: financieroLoader
      },
      {
        path: '/dashboard/contracts',
        element: <Contracts />,
        loader: tecnicoLoader
      },
      {
        path: '/dashboard/payments',
        element: <Payments />,
        loader: clienteLoader
      },
      {
        path: '/dashboard/binnacle',
        element: <Binnacle />,
        loader: adminLoader
      },




    ]
  },
  {
    path: '/pasarela',
    element: <Pasarela />
  },
  {
    path: '/404',
    element: <NotFound />,
  },
]);

export default AppRoutes;
