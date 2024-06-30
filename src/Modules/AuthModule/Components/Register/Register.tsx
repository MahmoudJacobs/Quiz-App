import { useForm } from "react-hook-form";
import { RegisterFormTypes } from "../../../../InterFaces/InterFaces";
import {
  emailValidation,
  passwordValidation,
} from "../../../../Utils/InputValidations";
import {
  FieldText,
  FieldPassword,
  SubmitBtn,
  FieldSelect,
} from "../Input/InputField";
import { getBaseUrl } from "../../../../Utils/Utils";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<RegisterFormTypes>();

  const onSubmit = async (data: RegisterFormTypes) => {
    try {
      const response = await axios.post(
        `${getBaseUrl()}/api/auth/register`,
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
      <form className="my-6" onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 lg:grid-cols-2 lg:space-x-2">
          <FieldText
            icon={
              <i
                className="fa-solid fa-address-card fa-lg"
                aria-label="first name input"
              ></i>
            }
            label="Your first name"
            name="first_name"
            validation={{
              required: "First name Is Required",
            }}
            error={errors.first_name?.message}
            placeholder="Type your first name"
            control={control}
          />

          <FieldText
            icon={
              <i
                className="fa-solid fa-address-card fa-lg"
                aria-label="last name input"
              ></i>
            }
            label="Your last name"
            name="last_name"
            validation={{
              required: "Last name Is Required",
            }}
            error={errors.last_name?.message}
            placeholder="Type your last name"
            control={control}
          />
        </div>

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

        <FieldSelect
          icon={
            <i
              className="fa-solid fa-envelope fa-lg"
              aria-label="email input"
            ></i>
          }
          validation={{
            required: "Role Is Required",
          }}
          label="Your role"
          name="role"
          error={errors.role?.message}
          control={control}
          options={options}
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
        <SubmitBtn name="Sign Up" submitting={isSubmitting} />
      </form>
      <span className="text-white  flex justify-end me-8">
        Login?
        <Link className="text-lime-300 ms-1" to={"/"}>
          click here
        </Link>
      </span>
    </>
  );
}

const options = [
  { value: "Instructor", name: "Instructor" },
  { value: "Student", name: "Student" },
];
