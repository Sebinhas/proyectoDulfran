import { createBrowserRouter } from 'react-router-dom';
import { lazy, Suspense } from 'react';
// import { toast } from 'react-toastify'
import { getTokenFromLocalStorage } from '../helpers/localstorage.helper.ts';
// landing
const Home = lazy(() => import('../pages/Home/Home'));
const NotFound = lazy(() => import('../components/NotFound/NotFound.tsx'));
const SkeletonDashboard = lazy(
  () => import('../pages/Admin/Dashboard/Components/Skeleton/DashboardSkeleton.tsx')
);
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
const Dashboard = lazy(() => import('../pages/Admin/Dashboard/Dashboard.tsx'));
const Invoices = lazy(() => import('../pages/Admin/Invoices/Invoices.tsx'));
const Settings = lazy(() => import('../pages/Admin/Settings/Settings.tsx'));
const Loading = lazy(() => import('../components/LoadingSpinner/Loading.tsx'));


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
        element: (
          <Suspense fallback={<SkeletonDashboard />}>
            <Dashboard />
          </Suspense>
        )
      },
      {
        path: '/dashboard/facturas',
        element: <Invoices />
      },
      {
        path: '/dashboard/ajustes',
        element: <Settings />
      }
    ]
  }
]);

export default AppRoutes;
