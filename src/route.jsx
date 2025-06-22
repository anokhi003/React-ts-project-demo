import { createBrowserRouter } from "react-router-dom";
import { lazy, Suspense } from "react";
import DefaultLayout from "./layout/defaultLayout/DefaultLayout";
import ProtectedRouting from "./components/auth/protectedRouting/ProtectedRouting";
import Loader from "./components/loader/Loader";

// Lazy-loaded pages
const NotFound = lazy(() => import("./pages/not-found/NotFound"));
const Dashboard = lazy(() => import("./pages/dashboard/Dashboard"));
const Users = lazy(() => import("./pages/users/UserProfile"));
const Login = lazy(() => import("./pages/auth/login/Login.tsx"));

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      // Uncomment when ready to use auth
      <ProtectedRouting requireTenantId={true}>
        <DefaultLayout />
      </ProtectedRouting>
    ),
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<Loader isAuthLoader={false} />}>
            <Dashboard />
          </Suspense>
        ),
      },
      {
        path: "user-profile",
        element: (
          <Suspense fallback={<Loader isAuthLoader={false} />}>
            <Users />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={<Loader isAuthLoader={true} />}>
        <Login />
      </Suspense>
    ),
  },
  {
    path: "*",
    element: (
      <Suspense fallback={<Loader isAuthLoader={true} />}>
        <NotFound />
      </Suspense>
    ),
  },
]);
