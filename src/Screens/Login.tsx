import { Link, Navigate, useNavigate } from "react-router-dom";
import { useState } from "react";
import {
  DefaultService,
  Body_login_for_access_token_user_auth_token_post,
} from "../vizoApi";
import { RouterPath } from "../App";

export const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const body: Body_login_for_access_token_user_auth_token_post = {
      username: email,
      password: password,
    };
    DefaultService.loginForAccessTokenUserAuthTokenPost(body)
      .then((response) => {
        localStorage.setItem("token", response.access_token);
        navigate(RouterPath.HOME);
      })
      .catch((error) => {
        alert("There was an error logging in. Please try again.");
      });
  };

  const getLogoUrl = (logoUrl: string) => {
    return require(`../Static/images/${logoUrl}.png`);
  };

  return (
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          src={getLogoUrl("logo")}
          className="mb-3 h-auto w-auto"
          alt="AirPipe logo"
        />
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl ">
              Sign in to your account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="name@company.com"
                  required={true}
                  onChange={handleEmailChange}
                ></input>
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required={true}
                  onChange={handlePasswordChange}
                ></input>
              </div>
              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 mt-5 text-white text-lg rounded-md px-4 py-2 h-16 w-40 flex items-center justify-center mx-auto disabled:opacity-50"
              >
                Sign in
              </button>
              <p className="text-sm font-light text-gray-500">
                Don’t have an account yet?{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline"
                  to={RouterPath.SIGNUP}
                >
                  {" "}
                  Sign Up
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
