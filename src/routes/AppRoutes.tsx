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
// pages auth
const Login = lazy(() => import('../pages/Auth/Login/Login'));
// pages dashboard
// const Patients = lazy(() => import('../pages/Admin/Patients/Patients.tsx'));
const Settings = lazy(() => import('../pages/Admin/Settings/Settings.tsx'));
const Loading = lazy(() => import('../components/LoadingSpinner/Loading.tsx'));
const Dashboard = lazy(() => import('../pages/Client/Dashboard/Dashboard.tsx'));
const Users = lazy(() => import('../pages/Admin/Users/Users.tsx'));

import { useAuthStore } from '../hooks/authStore.ts';

const authLoader = async () => {
  const isAuth = getTokenFromLocalStorage();
  if (!isAuth) {
    // toast.error('Debes estar autenticado para acceder')
    console.error('Debes estar autenticado para acceder');
  }
  return null;
};

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
    path: '/auth',
    element: (
      <Suspense fallback={<Loading />}>
        <AuthLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Login />
      },
      {
        path: '/auth/login',
        element: <Login />
      },
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
        element: (
          <Suspense>
            <Dashboard />
          </Suspense>
        )
      },
      // {
      //   path: '/dashboard/pacientes',
      //   element: <Patients />
      // },

      {
        path: '/dashboard/settings',
        element: <Settings />
      },
      // Rutas protegidas solo para admin
      
      {
        path: '/dashboard/users',
        element: <Users />,
        loader: adminLoader
      },
    ]
  },
  {
    path: '/404',
    element: <NotFound />,
  },
]);

export default AppRoutes;
