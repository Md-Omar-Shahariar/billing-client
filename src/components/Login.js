import React from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  useSendPasswordResetEmail,
  useSignInWithEmailAndPassword,
  useSignInWithGoogle,
} from "react-firebase-hooks/auth";
import auth from "../firebase.init";

// import Loading from "../Shared/Loading";
// import useToken from "../Authentication/useToken";
// import { toast, ToastContainer } from "react-toastify";

const Login = () => {
  const [sendPasswordResetEmail, sending] = useSendPasswordResetEmail(auth);
  const location = useLocation();
  const navigate = useNavigate();
  const [signInWithGoogle, gUser, gloading, gError] = useSignInWithGoogle(auth);
  const [signInWithEmailAndPassword, user, loading, error] =
    useSignInWithEmailAndPassword(auth);
  //   const [token] = useToken(user || gUser);

  let errorMessage;
  if (error || gError) {
    errorMessage = (
      <p className="text-red-500">{error?.message || gError?.message}</p>
    );
  }
  let from = location?.state?.from?.pathname || "/home";

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  //   if (token) {
  //     console.log(from);
  //     navigate(from, { replace: true });
  //   }

  const resetPassword = async (data) => {
    const email = document.getElementById("email").value;
    console.log(email);
    if (email) {
      await sendPasswordResetEmail(email);
      if (email) {
        // toast("Sent email");
      } else {
        // toast.error("Please enter email address");
      }
    } else {
      //   toast.error("Please Enter Email");
    }
  };
  //   if (loading && !token) {
  //     return <Loading></Loading>;
  //   }

  const onSubmit = async (data) => {
    await signInWithEmailAndPassword(data.email, data.password);
  };

  return (
    <div className="container">
      <div className="card">
        <div className="card-body">
          <h2 className="text-center">Login</h2>
          <form onSubmit={handleSubmit(onSubmit)} className="container">
            <div className="form-control ">
              <label className="pe-3 fw-bold">
                <span className="label-text">Email: </span>
              </label>
              <input
                {...register("email", {
                  required: {
                    value: true,
                    message: "Email is required",
                  },
                  pattern: {
                    value: /[a-z0-9]+@[a-z]+\.[a-z]{3}/,
                    message: "Provide a Valid Email",
                  },
                })}
                id="email"
                type="email"
                placeholder="Email"
                className=""
              />

              <label className="label">
                {errors.email?.type === "required" && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
                {errors.email?.type === "pattern" && (
                  <span className="text-red-600">{errors.email.message}</span>
                )}
              </label>
            </div>
            <div className="form-control w-full max-w-xs">
              <label className="pe-3 fw-bold">
                <span className="label-text">Password: </span>
              </label>
              <input
                {...register("password", {
                  required: {
                    value: true,
                    message: "Password is required",
                  },
                  minLength: {
                    value: 6,
                    message: "Must be Six Characters or more ",
                  },
                })}
                type="password"
                placeholder="Password"
                className=" "
              />

              <label className="label">
                {errors.password?.type === "required" && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
                {errors.password?.type === "minLength" && (
                  <span className="text-red-600">
                    {errors.password.message}
                  </span>
                )}
              </label>
            </div>
            {errorMessage}

            <input className="btn btn-secondary" type="submit" value="login" />
            <p className="mt-3 text-center">
              Forget Password?
              <span onClick={() => resetPassword()} className="btn btn-primary">
                Reset Password
              </span>
            </p>
          </form>
          <p className="">
            Don't Have Account?
            <Link to="/signup" className="">
              Create New Account
            </Link>
          </p>

          <div className="">OR</div>
          <button
            onClick={() => {
              signInWithGoogle();
            }}
            className="btn  btn-secondary "
          >
            Continue With Google
          </button>
        </div>
        {/* <ToastContainer></ToastContainer> */}
      </div>
    </div>
  );
};

export default Login;
