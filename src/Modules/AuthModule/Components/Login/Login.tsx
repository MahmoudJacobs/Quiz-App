import { useForm } from "react-hook-form";
import { LoginFormTypes } from "../../../../InterFaces/InterFaces";
import {
  emailValidation,
  passwordValidation,
} from "../../../../Utils/InputValidations";
import { FieldText, FieldPassword, SubmitBtn } from "../Input/InputField";
import axios from "axios";
import { getBaseUrl } from "../../../../Utils/Utils";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function login() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormTypes>();

  const onSubmit = async (data: LoginFormTypes) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/login`,
        data,
        {
          headers: {
            language: "ar",
          },
        }
      );

      toast.success(response.data.message);
      console.log(response);

      navigate("/dashboard");
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };
  return (
    <>
      <form className="mt-4" onSubmit={handleSubmit(onSubmit)}>
        <FieldText
          icon={
            <i
              className="fa-solid fa-envelope fa-lg"
              aria-label="email input"
            ></i>
          }
          label="Registered email address"
          name="email"
          validation={emailValidation}
          error={errors.email?.message}
          placeholder="Type your email"
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
        <SubmitBtn name="Sign In" submitting={isSubmitting} />
      </form>
      <span className="text-white mt-56 flex justify-end me-8">
        Forgot password?
        <Link className="text-lime-300 ms-1" to={"/forget-password"}>
          click here
        </Link>
      </span>
    </>
  );
}
