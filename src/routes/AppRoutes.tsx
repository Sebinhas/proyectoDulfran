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
const Profile = lazy(() => import('../pages/Client/Profile/Profile.tsx'));
const Loading = lazy(() => import('../components/LoadingSpinner/Loading.tsx'));
const Invoices = lazy(() => import('../pages/Client/Invoices/Invoices.tsx'));
const Users = lazy(() => import('../pages/Admin/Users/Users.tsx'));
const Notifications = lazy(() => import('../pages/Client/Notifications/Notifications.tsx'));
const Pqr = lazy(() => import('../pages/Client/Pqr/Pqr.tsx'));
const PqrResponse = lazy(() => import('../pages/Admin/PqrResponse/PqrResponse.tsx'));
const Pasarela = lazy(() => import('../pages/Pasarela/Pasarela.tsx'));
import { useAuthStore } from '../hooks/authStore.ts';
import Reports from '../pages/Admin/Reports/Reports.tsx';


// Agregamos un nuevo loader para verificar el rol de admin
const adminLoader = () => {
  const user = useAuthStore.getState().user;
  if (user?.role !== 'admin') {
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
        element: <Invoices />
      },
      {
        path: '/dashboard/pqrResponse',
        element: <PqrResponse />
      },
      {
        path: '/dashboard/reports',
        element: <Reports />,
        loader: adminLoader
      },
      {
        path: '/dashboard/users',
        element: <Users />,
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
