import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  User,
  DefaultService,
  Body_login_for_access_token_user_auth_token_post,
  OnboardingStage,
} from "../vizoApi";
import { RouterPath } from "../App";
import validator from "validator";

export const SignUp = () => {
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
    const newUser: User = {
      email: email,
      hashed_password: password,
      onboarding_stage: OnboardingStage.CONNECT,
    };

    const isValid = validator.isEmail(email);

    if (isValid === false) {
      alert("Please enter a valid email address.");
    }

    DefaultService.createCustomerUserCreateCustomerPost(newUser)
      .then((response) => {
        const body: Body_login_for_access_token_user_auth_token_post = {
          username: email,
          password: password,
        };
        DefaultService.loginForAccessTokenUserAuthTokenPost(body)
          .then((response) => {
            localStorage.setItem("token", response.access_token);
          })
          .then(() => {
            navigate(RouterPath.WELCOME);
          })
          .catch((error) => {
            console.log("Error");
          });
      })
      .catch((error) => {
        if (error.status === 400) {
          alert("Email already exists");
        } else {
          console.log("Error");
        }
      });
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <a
          href="#"
          className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
        >
          AirPipe
        </a>
        <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit}>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="name@company.com"
                  onChange={handleEmailChange}
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  onChange={handlePasswordChange}
                />
              </div>
              <button
                type="submit"
                // className="w-full text-white bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
              >
                Create an account
              </button>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                By signing up, you agree to be contacted via email. You may
                unsubscribe at anytime.
              </p>
              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have an account?{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                  to={RouterPath.LOGIN}
                >
                  {" "}
                  Log in
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};
