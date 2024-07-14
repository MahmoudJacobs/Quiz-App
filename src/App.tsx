import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Dashboard from "./Modules/AdminDashboard/Componenets/Dashboard/Dashboard";
import GroupsList from "./Modules/AdminDashboard/Componenets/Groups/GroupsList/GroupsList";
import QuizzDetails from "./Modules/AdminDashboard/Componenets/QuizzDetails/QuizzDetails";
import QuestionsList from "./Modules/AdminDashboard/Componenets/Quizzes/QuestionsList/QuestionsList";
import QuizzesList from "./Modules/AdminDashboard/Componenets/Quizzes/QuizzesList/QuizzesList";
import ResultsList from "./Modules/AdminDashboard/Componenets/Results/ResultsList/ResultsList";
import StudentsList from "./Modules/AdminDashboard/Componenets/Students/StudentsList/StudentsList";
import ChangePassword from "./Modules/AuthModule/Components/ChangePassword";
import ForgetPassword from "./Modules/AuthModule/Components/ForgetPassword/ForgetPassword";
import Login from "./Modules/AuthModule/Components/Login/Login";
import Register from "./Modules/AuthModule/Components/Register/Register";
import ResetPassword from "./Modules/AuthModule/Components/ResetPassword/ResetPassword";
import SignInUp from "./Modules/AuthModule/Components/SignIn-up/SignInUp";
import AuthLayout from "./Modules/SharedModules/Components/Layouts/AuthLayout/AuthLayout";
import DashboardLayout from "./Modules/SharedModules/Components/Layouts/DashboardLayout/DashboardLayout";
import TDashboardLayout from "./Modules/SharedModules/Components/Layouts/TDashboardLayout/TDashboardLayout";
import NoData from "./Modules/SharedModules/Components/NoData/NoData";
import TestDashboard from "./Modules/TestModule/Components/TestDashboard/TestDashboard";
import TestQuizzes from "./Modules/TestModule/Components/TestQuizzes/TestQuizzes";
import TestResults from "./Modules/TestModule/Components/TestResults";
import { setToken } from "./Redux/UserSlice";

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    const storedToken = localStorage.getItem("accessToken");
    if (storedToken) {
      dispatch(setToken(storedToken));
    }
  }, [dispatch]);
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
          path: "quizzes/:id",
          element: <QuizzDetails />,
        },
        {
          path: "results",
          element: <ResultsList />,
        },
        {
          path: "questions",
          element: <QuestionsList />,
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
  return <RouterProvider router={routes} />;
}
