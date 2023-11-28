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
import { UserInDB } from "../vizoApi/models/UserInDB";

export const SignUp = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [privacyChecked, setPrivacyChecked] = useState<boolean>(false);

  const getLogoUrl = (logoUrl: string) => {
    return require(`../Static/images/${logoUrl}.png`);
  };

  const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePasswordChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const newUser: UserInDB = {
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
    <section className="bg-gray-50">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <img
          src={getLogoUrl("logo")}
          className="mb-3 h-auto w-auto"
          alt="AirPipe logo"
        />
        <div className="w-full bg-white rounded-lg shadow md:mt-0 sm:max-w-md xl:p-0 ">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              Create an account
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
                  onChange={handleEmailChange}
                />
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
                  onChange={handlePasswordChange}
                />
              </div>
              <p className="text-sm font-light text-gray-500">
                By signing up, you agree to accept our{" "}
                <a
                  href="https://useairpipe.com/privacy"
                  target="_blank"
                  className="underline"
                >
                  Privacy Policy
                </a>{" "}
                and{" "}
                <a
                  href="https://useairpipe.com/terms-of-service"
                  target="_blank"
                  className="underline"
                >
                  Terms of Service.
                </a>
              </p>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="flex items-center">
                    <input
                      id="privacy"
                      aria-describedby="privacy"
                      type="checkbox"
                      className="w-4 h-4 border mt-0 border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:focus:ring-primary-600 dark:ring-offset-gray-800 align-middle" // Added align-middle here
                      onChange={() => setPrivacyChecked(!privacyChecked)}
                    />
                  </div>
                  <label
                    htmlFor="privacy"
                    className="ml-3 text-sm font-light text-gray-500 align-middle" // Added align-middle here
                  >
                    I accept the{" "}
                    <a
                      className="font-medium text-primary-600 hover:underline"
                      href="https://useairpipe.com/privacy"
                      target="_blank"
                    >
                      Privacy Policy
                    </a>
                  </label>
                </div>
              </div>

              <button
                type="submit"
                className="bg-teal-500 hover:bg-teal-600 mt-5 text-white rounded-md px-4 py-2 h-16 w-60 flex items-center justify-center mx-auto disabled:opacity-50"
                disabled={!privacyChecked}
              >
                Create account
              </button>

              <p className="text-sm font-light text-gray-500">
                Already have an account?{" "}
                <Link
                  className="font-medium text-primary-600 hover:underline"
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
