import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Modules/AdminDashboard/Componenets/Dashboard/Dashboard";
import GroupsList from "./Modules/AdminDashboard/Componenets/Groups/GroupsList/GroupsList";
import QuizzesList from "./Modules/AdminDashboard/Componenets/Quizzes/QuizzesList/QuizzesList";
import ResultsList from "./Modules/AdminDashboard/Componenets/Results/ResultsList/ResultsList";
import ChangePassword from "./Modules/AuthModule/Components/ChangePassword";
import ForgetPassword from "./Modules/AuthModule/Components/ForgetPassword/ForgetPassword";
import Login from "./Modules/AuthModule/Components/Login/Login";
import Register from "./Modules/AuthModule/Components/Register/Register";
import ResetPassword from "./Modules/AuthModule/Components/ResetPassword/ResetPassword";
import AuthLayout from "./Modules/SharedModules/Components/Layouts/AuthLayout/AuthLayout";
import DashboardLayout from "./Modules/SharedModules/Components/Layouts/DashboardLayout/DashboardLayout";
import NoData from "./Modules/SharedModules/Components/NoData/NoData";
import TestDashboard from "./Modules/TestModule/Components/TestDashboard/TestDashboard";
import TDashboardLayout from "./Modules/SharedModules/Components/Layouts/TDashboardLayout/TDashboardLayout";
import TestQuizzes from "./Modules/TestModule/Components/TestQuizzes/TestQuizzes";
import TestResults from "./Modules/TestModule/Components/TestResults";
import StudentsList from "./Modules/AdminDashboard/Componenets/Students/StudentsList/StudentsList";
import SignInUp from "./Modules/AuthModule/Components/SignIn-up/SignInUp";

export default function App() {
  const routes = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NoData />,
      children: [
        {
          element: <SignInUp />,
          children: [
            {
              index: true,
              element: <Login />,
            },
            {
              path: "register",
              element: <Register />,
            },
          ],
        },
        {
          path: "forget-password",
          element: <ForgetPassword />,
        },
        {
          path: "reset-password",
          element: <ResetPassword />,
        },
        {
          path: "change-password",
          element: <ChangePassword />,
        },
      ],
    },
    {
      path: "/dashboard",
      element: <DashboardLayout />,
      errorElement: <NoData />,
      children: [
        {
          index: true,
          element: <Dashboard />,
        },
        {
          path: "groups",
          element: <GroupsList />,
        },
        {
          path: "students",
          element: <StudentsList />,
        },
        {
          path: "quizzes",
          element: <QuizzesList />,
        },
        {
          path: "results",
          element: <ResultsList />,
        },
      ],
    },
    {
      path: "/test",
      element: <TDashboardLayout />,
      errorElement: <NoData />,
      children: [
        {
          index: true,
          element: <TestDashboard />,
        },
        {
          path: "quizzes",
          element: <TestQuizzes />,
        },
        {
          path: "results",
          element: <TestResults />,
        },
      ],
    },
  ]);
  return (
    <>
      <RouterProvider router={routes} />
    </>
  );
}
