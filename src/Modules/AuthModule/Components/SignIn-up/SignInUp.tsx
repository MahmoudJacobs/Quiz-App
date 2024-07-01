import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import logo from "../../../../assets/images/Logo-white.png";
import style from "../Auth.module.css";
export default function SignInUp() {
  const navigate = useNavigate();
  const location = useLocation();
  return (
    <>
      <section className="bg-slate-950 min-h-screen ">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className={`${style.resSrc} pt-3 ps-5 lg:mt-10 lg:ms-5 `}>
            <img src={logo} alt="" />
            <div className="mt-2">
              <h6 className="text-lime-300 text-2xl">
                Continue your learning journey with QuizWiz!
              </h6>
              <button
                onClick={() => navigate("/")}
                className={`mt-5 bg-gray-600 h-24 w-28 rounded-md ${
                  location.pathname === "/" && "border-4 border-lime-300"
                }`}
              >
                <i
                  className={`fa-solid fa-user-tie register ${
                    location.pathname === "/" ? "text-lime-300" : "text-white"
                  } fa-2xl `}
                ></i>
                <p className="text-white mt-2">Sign in </p>
              </button>
              <button
                onClick={() => navigate("/register")}
                className={`ms-6 bg-gray-600 h-24 w-28 rounded-md ${
                  location.pathname === "/register" &&
                  "border-4 border-lime-300"
                }`}
              >
                <i
                  className={`fa-solid fa-user-plus ${
                    location.pathname === "/register"
                      ? "text-lime-300"
                      : "text-white"
                  } fa-2xl `}
                ></i>
                <p className="text-white mt-2">Sign up </p>
              </button>
              <div className="me-5">
                <Outlet />
              </div>
            </div>
          </div>
          <div className={`${style.bgAuth} mt-5 hidden lg:block`}></div>
        </div>
      </section>
    </>
  );
}
