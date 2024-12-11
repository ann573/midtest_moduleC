import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { loginSchema } from "./../schema/auth";
import { instance } from "./../service/index";
const LoginPage = () => {
  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const submitForm = async (data) => {
    try {
      const res = await instance.post("/login", data);
      if (res.data) {
        localStorage.setItem("accessToken", res.data.accessToken)
        localStorage.setItem("role", res.data.user.role)
        localStorage.setItem("email", res.data.user.email)
        if (res.data.user.role === "user"){
          nav("/")
        } else nav("/admin")
      }
    } catch (error) {
      if (error.status === 400) {
        toast.error("Tài khoản hoặc mật khẩu bị sai");
      } else {
        toast.error(error?.response.data);
      }
      
    }
  };
  return (
    <>
      <form
        className="max-w-[450px] mx-auto mt-10 border rounded-md px-3"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-3xl font-bold text-center my-2">Đăng nhập</h1>
        <div className="mb-3 flex flex-col">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            name="email"
            id="email"
            placeholder="Nhập email..."
            className="w-full px-3 py-1 border mt-1"
            {...register("email")}
          />
          {errors.email && (
            <p className="text-red-500 italic">{errors?.email?.message}</p>
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            name="password"
            id="password"
            placeholder="Nhập mật khẩu..."
            className="w-full px-3 py-1 border mt-1"
            {...register("password")}
          />
          {errors.password && (
            <p className="text-red-500 italic">{errors.password.message}</p>
          )}
        </div>
        <div className="mb-3 ">
          <p className="mb-3 text-sm">
            Bạn chưa có tài khoản?{" "}
            <Link
              to="/register"
              className="italic underline hover:text-orange-500"
            >
              Đăng ký ngay
            </Link>
          </p>
          <button className="w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 py-1 rounded-md text-white font-bold">
            Đăng nhập
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default LoginPage;
