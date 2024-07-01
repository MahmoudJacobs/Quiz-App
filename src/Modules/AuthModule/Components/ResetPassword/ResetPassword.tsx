import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { emailValidation, passwordValidation } from "../../../../Utils/InputValidations";
import logo from "../../../../assets/images/Logo-white.png";
import style from "../Auth.module.css";
import { FieldPassword, FieldText, SubmitBtn } from "../Input/InputField";
import { toast } from "react-toastify";
import { getBaseUrl } from "../../../../Utils/Utils";
import axios from "axios";

export default function ResetPassword() {
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data: string) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/reset-password`,
        data
        // {
        //   headers: {
        //     language: "ar",
        //   },
        // }
      );

      toast.success(response.data.message);
      console.log(response);

      navigate("/");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <section className="bg-slate-950 min-h-screen ">
        <div className="grid grid-cols-1 lg:grid-cols-2">
          <div className={`${style.resSrc} pt-3 ps-5 lg:mt-10 lg:ms-5 `}>
            <img src={logo} alt="" />
            <div className="mt-2">
              <h6 className="text-lime-300 mt-16 text-2xl">Reset password</h6>

              <div className="me-5 mt-24">
                <form onSubmit={handleSubmit(onSubmit)}>
                  <FieldText
                    icon={
                      <i
                        className="fa-solid fa-envelope fa-lg"
                        aria-label="email input"
                      ></i>
                    }
                    label="Email address"
                    name="email"
                    validation={emailValidation}
                    error={errors.email?.message}
                    placeholder="Type your email"
                    control={control}
                  />
                  <FieldText
                    icon={
                      <i
                        className="fa-solid fa-shield-halved fa-lg"
                        aria-label="email input"
                      ></i>
                    }
                    label="OTP"
                    name="otp"
                    validation={{
                      required: "Otp Is Required",
                    }}
                    error={errors.otp?.message}
                    placeholder="Type your otp"
                    control={control}
                  />
                  <FieldPassword
                    icon={
                      <i
                        className="fa-solid fa-key fa-lg"
                        aria-label="password input"
                      ></i>
                    }
                    label="Password"
                    name="password"
                    validation={passwordValidation}
                    error={errors.password?.message}
                    placeholder="Type your password"
                    control={control}
                  />
                  <SubmitBtn name="Reset" submitting={isSubmitting} />
                </form>
              </div>
              <span className="text-white mt-28 flex justify-end me-8">
                Login?
                <Link className="text-lime-300 ms-1" to={"/"}>
                  click here
                </Link>
              </span>
            </div>
          </div>
          <div className={`${style.bgAuth} mt-5 hidden lg:block`}></div>
        </div>
      </section>
    </>
  );
}
