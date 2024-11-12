import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApplicationLayout } from "./components/ApplicationLayout/ApplicationLayout.tsx";
import { AuthenticationLayout } from "./features/authentication/components/AuthenticationLayout/AuthenticationLayout.tsx";
import { AuthenticationContextProvider } from "./features/authentication/contexts/AuthenticationContextProvider";
import { Login } from "./features/authentication/pages/Login/Login";
import { ResetPassword } from "./features/authentication/pages/ResetPassword/ResetPassword";
import { Signup } from "./features/authentication/pages/Signup/Signup";
import { VerifyEmail } from "./features/authentication/pages/VerifyEmail/VerifyEmail.tsx";
import { Feed } from "./features/feed/Feed";
import "./index.scss";

const router = createBrowserRouter([
  {
    element: <AuthenticationContextProvider />,
    children: [
      {
        path: "/",
        element: <ApplicationLayout />,
        children: [
          {
            index: true,
            element: <Feed />,
          },
          {
            path: "/network",
            element: <div>Network</div>,
          },
          {
            path: "/jobs",
            element: <div>Jobs</div>,
          },
          {
            path: "/messaging",
            element: <div>Messaging</div>,
          },
          {
            path: "/notifications",
            element: <div>Notifications</div>,
          },
          {
            path: "/profile/:id",
            element: <div>Profile</div>,
          },
          {
            path: "/settings",
            element: <div>Settings & Privacy</div>,
          },
        ],
      },
      {
        element: <AuthenticationLayout />,
        children: [
          {
            path: "/login",
            element: <Login />,
          },
          {
            path: "/signup",
            element: <Signup />,
          },
          {
            path: "/request-password-reset",
            element: <ResetPassword />,
          },
          {
            path: "/verify-email",
            element: <VerifyEmail />,
          },
        ],
      },
    ],
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
