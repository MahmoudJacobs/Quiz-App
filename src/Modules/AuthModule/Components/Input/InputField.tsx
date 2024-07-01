import { useState } from "react";
import {
  Control,
  Controller,
  FieldValues,
  Path,
  PathValue,
} from "react-hook-form";

type InputProps<TFieldValue extends FieldValues> = {
  icon: HTMLElement;
  label: string;
  name: Path<TFieldValue>;
  type?: string;
  validation: any;
  error: string;
  placeholder: string;
  control: Control<TFieldValue>;
  defaultValue?: PathValue<TFieldValue, Path<TFieldValue>>;
};
type SelectProps<TFieldValue extends FieldValues> = {
  icon: HTMLElement;
  label: string;
  name: Path<TFieldValue>;
  validation: any;
  error: string;
  placeholder: string;
  control: Control<TFieldValue>;
  defaultValue?: PathValue<TFieldValue, Path<TFieldValue>>;
  options: [{ value: string; name: string }];
};
type SubmitProps = {
  name: string;
  submitting: boolean;
};
export const FieldText = <TFieldValue extends FieldValues>({
  icon,
  label,
  name,
  type = "text",
  validation,
  error,
  placeholder,
  control,
  defaultValue,
}: InputProps<TFieldValue>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="w-full  my-5">
            <div>
              <label
                htmlFor={name}
                className={`block text-sm font-medium mb-2 ${
                  error ? "text-red-500" : "text-white"
                }`}
              >
                {label}
              </label>
              <div className="relative">
                <input
                  autoComplete="true"
                  {...field}
                  type={type}
                  id={name}
                  className={`bg-transparent py-3 px-4 ps-11 block w-full border-2 ${
                    error ? "border-red-500" : "border-white"
                  } shadow-sm rounded-lg text-sm focus:outline-none  disabled:opacity-50 disabled:pointer-events-none text-white ${
                    error ? "placeholder-red-500" : "placeholder-white"
                  }`}
                  placeholder={placeholder}
                />
                <div
                  className={`absolute inset-y-0 start-0 flex ${
                    error ? "text-red-500" : "text-white"
                  } items-center pointer-events-none z-20 ps-4`}
                >
                  {icon}
                </div>
              </div>
              {error && <p className="text-red-500 ps-2"> {error}</p>}
            </div>
          </div>
        )}
      />
    </>
  );
};

export const FieldPassword = <TFieldValue extends FieldValues>({
  icon,
  label,
  name,
  validation,
  error,
  placeholder,
  control,
  defaultValue,
}: InputProps<TFieldValue>) => {
  const [showPassword, setShowPassword] = useState("password");
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="w-full  my-5">
            <div>
              <label
                htmlFor={name}
                className={`block text-sm font-medium mb-2 ${
                  error ? "text-red-500" : "text-white"
                }`}
              >
                {label}
              </label>
              <div className="relative">
                <div
                  className={`absolute inset-y-0 end-0 flex items-center z-20 pe-4`}
                >
                  <button
                    type="button"
                    onClick={() => {
                      setShowPassword(
                        showPassword === "password" ? "text" : "password"
                      );
                    }}
                  >
                    <i
                      className={`fa-regular ${
                        showPassword === "password" ? "fa-eye-slash" : "fa-eye"
                      } fa-lg cursor-pointer text-white`}
                      aria-label="show password"
                    ></i>
                  </button>
                </div>
                <input
                  autoComplete="false"
                  {...field}
                  type={showPassword}
                  id={name}
                  className={`bg-transparent py-3 px-4 ps-11 block w-full border-2 ${
                    error ? "border-red-500" : "border-white"
                  } shadow-sm rounded-lg text-sm focus:outline-none  disabled:opacity-50 disabled:pointer-events-none text-white ${
                    error ? "placeholder-red-500" : "placeholder-white"
                  }`}
                  placeholder={placeholder}
                />
                <div
                  className={`absolute inset-y-0 start-0 flex ${
                    error ? "text-red-500" : "text-white"
                  } items-center pointer-events-none z-20 ps-4`}
                >
                  {icon}
                </div>
              </div>
              {error && <p className="text-red-500 ps-2"> {error}</p>}
            </div>
          </div>
        )}
      />
    </>
  );
};

export const SubmitBtn = ({ name, submitting }: SubmitProps) => {
  return (
    <>
      <button
        disabled={submitting}
        type="submit"
        className="text-black py-4 px-7 rounded-md bg-white text-lg font-semibold"
      >
        {name}
        <span className=" ms-3 bg-black px-1 rounded-full">
          <i className="fa-solid fa-check text-white  "></i>
        </span>
      </button>
    </>
  );
};

export const FieldSelect = <TFieldValue extends FieldValues>({
  icon,
  label,
  name,
  validation,
  error,
  control,
  defaultValue,
  options,
}: SelectProps<TFieldValue>) => {
  return (
    <>
      <Controller
        name={name}
        control={control}
        rules={validation}
        defaultValue={defaultValue}
        render={({ field }) => (
          <div className="w-full  my-5">
            <div>
              <label
                htmlFor={name}
                className={`block text-sm font-medium mb-2 ${
                  error ? "text-red-500" : "text-white"
                }`}
              >
                {label}
              </label>
              <div className="relative">
                <select
                  {...field}
                  id={name}
                  className={`bg-transparent  py-3 px-4 ps-11 block w-full border-2 ${
                    error ? "border-red-500" : "border-white"
                  } shadow-sm rounded-lg text-sm focus:outline-none  disabled:opacity-50 disabled:pointer-events-none text-white ${
                    error ? "placeholder-red-500" : "placeholder-white"
                  }`}
                >
                  <option selected disabled className="text-white bg-gray-700">
                    Choose your role
                  </option>
                  {options?.map((opt) => (
                    <option
                      className="text-white bg-gray-700"
                      key={opt.value}
                      value={opt.value}
                    >
                      {opt.name}
                    </option>
                  ))}
                  {/* <option value="volvo">Volvo</option>
                  <option value="saab">Saab</option> */}
                </select>

                <div
                  className={`absolute inset-y-0 start-0 flex ${
                    error ? "text-red-500" : "text-white"
                  } items-center pointer-events-none z-20 ps-4`}
                >
                  {icon}
                </div>
              </div>
              {error && <p className="text-red-500 ps-2"> {error}</p>}
            </div>
          </div>
        )}
      />
    </>
  );
};
