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
import Dashboard from '../pages/Global/Dashboard/Dasboard.tsx';


// Agregamos un nuevo loader para verificar el rol de admin
const roleLoader = (allowedRoles: string[]) => {
  return () => {
    const user = useAuthStore.getState().user;
    if (!allowedRoles.includes(user?.role || '')) {
      return redirect('/404');
    }
    return null;
  };
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
      {
        index: true,
        element: <Dashboard />
      },
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
        element: <Pqr />,
        loader: roleLoader(['cliente'])
      },              
      // Rutas protegidas solo para admin


      {
        path: '/dashboard/invoices',
        element: <Invoices />,
        loader: roleLoader(['financiero'])
      },


      {
        path: '/dashboard/pqrResponse',
        element: <PqrResponse />,
        loader: roleLoader(['financiero', 'tecnico'])
      },



      {
        path: '/dashboard/reports',
        element: <Reports />,
        loader: roleLoader(['administrador', 'financiero'])
      },


      {
        path: '/dashboard/users',
        element: <Users />,
        loader: roleLoader(['administrador'])
      },
      {
        path: '/dashboard/clients',
        element: <Clients />,
        loader: roleLoader(['financiero'])
      },

      {
        path: '/dashboard/contracts',
        element: <Contracts />,
        loader: roleLoader(['tecnico'])
      },

      {
        path: '/dashboard/payments',
        element: <Payments />,
        loader: roleLoader(['cliente'])
      },

      {
        path: '/dashboard/binnacle',
        element: <Binnacle />,
        loader: roleLoader(['administrador'])
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
