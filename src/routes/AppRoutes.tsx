import { createBrowserRouter, redirect } from "react-router-dom";
import { lazy, Suspense } from "react";
// landing
const Home = lazy(() => import("../pages/Home/Home"));
const NotFound = lazy(() => import("../components/NotFound/NotFound.tsx"));

const SkeletonPrivateLayout = lazy(
  () => import("../layouts/Components/Skeleton/SkeletonPrivateLayout.tsx")
);
// layouts
const MainLayout = lazy(() => import("../layouts/MainLayout"));
const AuthLayout = lazy(() => import("../layouts/AuthLayout"));
const PrivateLayout = lazy(() => import("../layouts/PrivateLayout"));
// pages dashboard
const Profile = lazy(() => import("../pages/Global/Profile/Profile.tsx"));
const Loading = lazy(() => import("../components/LoadingSpinner/Loading.tsx"));
const Invoices = lazy(() => import("../pages/Financial/Invoices/Invoices.tsx"));
const Clients = lazy(() => import("../pages/Financial/Clients/Clients.tsx"));
const Users = lazy(() => import("../pages/Administrator/Users/Users.tsx"));
const Notifications = lazy(
  () => import("../pages/Global/Notifications/Notifications.tsx")
);
const Pqr = lazy(() => import("../pages/Global/Pqr/Pqr.tsx"));
const PqrResponse = lazy(
  () => import("../pages/Global/PqrResponse/PqrResponse.tsx")
);

const Pasarela = lazy(() => import("../pages/Pasarela/Pasarela.tsx"));
import { useAuthStore } from "../hooks/authStore.ts";
const Reports = lazy(() => import("../pages/Global/Reports/Reports.tsx"));
const Contracts = lazy(
  () => import("../pages/Technical/Contracts/Contracts.tsx")
);
const Payments = lazy(() => import("../pages/Clients/Payments/Payments.tsx"));
const Binnacle = lazy(
  () => import("../pages/Administrator/Binnacle/Binnacle.tsx")
);
// const Dashboard = lazy(() => import('../pages/Global/Dashboard/Dasboard.tsx'));
import Dashboard from "../pages/Global/Dashboard/Dasboard.tsx";
const NequiInfo = lazy(
  () =>
    import("../pages/Pasarela/components/paymentInfo/NequiInfo/NequiInfo.tsx")
);
const NequiConfirmation = lazy(
  () =>
    import(
      "../pages/Pasarela/components/paymentConfirmation/NequiConfirmation/NequiConfirmation.tsx"
    )
);
const Suscribe = lazy(() => import("../pages/Global/Suscribe/Suscribe.tsx"));
const PSEInfo = lazy(
  () => import("../pages/Pasarela/components/paymentInfo/PSEInfo/PSEInfo.tsx")
);
const PSEConfirmation = lazy(
  () =>
    import(
      "../pages/Pasarela/components/paymentConfirmation/PSEConfirmation/PSEConfirmation.tsx"
    )
);

// Agregamos un nuevo loader para verificar el rol de admin
const roleLoader = (allowedRoles: string[]) => {
  return () => {
    const user = useAuthStore.getState().user;
    if (!allowedRoles.includes(user?.profile_type || "")) {
      return redirect("/404");
    }
    return null;
  };
};

const AppRoutes = createBrowserRouter([
  {
    path: "/",
    element: (
      <Suspense fallback={<Loading />}>
        <MainLayout />
      </Suspense>
    ),
    errorElement: <NotFound />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "auth",
        element: <AuthLayout />,
      },
      {
        path: "subscribe",
        element: <Suscribe />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <Suspense fallback={<SkeletonPrivateLayout />}>
        <PrivateLayout />
      </Suspense>
    ),
    children: [
      {
        index: true,
        element: <Dashboard />,
      },
      {
        path: "/dashboard/profile",
        element: <Profile />,
      },
      {
        path: "/dashboard/notifications",
        element: <Notifications />,
      },
      {
        path: "/dashboard/pqr",
        element: <Pqr />,
        loader: roleLoader(["cliente"]),
      },
      // Rutas protegidas solo para admin
      {
        path: "/dashboard/invoices",
        element: <Invoices />,
        loader: roleLoader(["financiero"]),
      },
      {
        path: "/dashboard/pqrResponse",
        element: <PqrResponse />,
        loader: roleLoader(["financiero", "tecnico"]),
      },
      {
        path: "/dashboard/reports",
        element: <Reports />,
        loader: roleLoader(["admin", "financiero"]),
      },
      {
        path: "/dashboard/users",
        element: <Users />,
        loader: roleLoader(["admin"]),
      },
      {
        path: "/dashboard/clients",
        element: <Clients />,
        loader: roleLoader(["financiero"]),
      },

      {
        path: "/dashboard/contracts",
        element: <Contracts />,
        loader: roleLoader(["tecnico"]),
      },
      {
        path: "/dashboard/payments",
        element: <Payments />,
        loader: roleLoader(["cliente"]),
      },

      {
        path: "/dashboard/binnacle",
        element: <Binnacle />,
        loader: roleLoader(["admin"]),
      },
    ],
  },
  {
    path: "/dashboard/payments",
    element: (
      <Suspense fallback={<SkeletonPrivateLayout />}>
        <PrivateLayout />
      </Suspense>
    ),
    children: [
      {
        path: "/dashboard/payments/payment_method",
        element: <Pasarela />,
        loader: roleLoader(["cliente"]),
      },
      {
        path: "/dashboard/payments/payment_method/nq",
        element: <NequiInfo />,
        loader: roleLoader(["cliente"]),
      },
      {
        path: "/dashboard/payments/payment_method/nq/confirmation",
        element: <NequiConfirmation />,
        loader: roleLoader(["cliente"]),
      },
      {
        path: "/dashboard/payments/payment_method/pse",
        element: <PSEInfo />,
        loader: roleLoader(["cliente"]),
      },
      {
        path: "/dashboard/payments/payment_method/pse/payment_confirmation",
        element: <PSEConfirmation />,
        loader: roleLoader(["cliente"]),
      },
    ],
  },
  {
    path: "/404",
    element: <NotFound />,
  },
]);

export default AppRoutes;
