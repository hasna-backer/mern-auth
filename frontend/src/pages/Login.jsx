import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import {
  signInStart,
  signInSuccess,
  signInFailure,
} from "../redux/user/userSlice";
import { useDispatch, useSelector } from "react-redux";
import OAuth from "../components/OAuth";

function Login() {
  const [formData, setFormData] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  // const { err, loading } = useSelector((state) => state.user);
  // console.log("err:", error);
  // console.log("loading:", loading);
  // const userState = useSelector((state) => state.user);
  // console.log("User State:", userState);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleInputs = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    console.log("clicked");

    e.preventDefault();
    try {
      setLoading(true);
      setError(false);
      console.log("signInStart");
      // dispatch(signInStart());

      const res = await axios.post("/api/user/auth", formData);
      console.log("huhkgkjh");

      const data = res;
      console.log("response data:", res.data);
      setLoading(false);

      dispatch(signInSuccess(res.data));
      navigate("/");
    } catch (error) {
      setError(true);
      console.log(error);
      setLoading(false);
      // console.log("signInFailure");
      // dispatch(signInFailure());

      // console.log("error.msg", error.message);
    }
  };
  // console.log(formData);
  return (
    <>
      <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-sm">
          <img
            className="mx-auto h-10 w-auto"
            src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
            Sign In
          </h2>
        </div>
        <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
          <form
            className="space-y-6"
            action="#"
            method="POST"
            onSubmit={handleSubmit}
          >
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Email address
              </label>
              <div className="mt-2">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required=""
                  onChange={handleInputs}
                  className="block w-full pl-2 rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium leading-6 text-gray-900"
                >
                  Password
                </label>
                <div className="text-sm">
                  <a
                    href="#"
                    className="font-semibold  text-indigo-600 hover:text-indigo-500"
                  >
                    {/* Forgot password? */}
                  </a>
                </div>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  onChange={handleInputs}
                  required=""
                  className="block w-full rounded-md pl-2 border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <button
                type="submit"
                disabled={loading}
                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              >
                {loading}
                {loading ? "Loading..." : "Login"}
              </button>
            </div>
            <OAuth />
          </form>
          <p className="text-red-700 mt-3">
            {error && "Invalid credentials...!"}
          </p>
          <p className="mt-10 text-center text-sm text-gray-500">
            Dont Have an Account? &nbsp;
            <Link
              to="/signup"
              href="#"
              className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </>
  );
}

export default Login;
