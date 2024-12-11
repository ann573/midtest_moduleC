import React from "react";
import { useForm } from "react-hook-form";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { ToastContainer } from "react-toastify";
import { zodResolver } from "@hookform/resolvers/zod";
import { registerSchema } from "./../schema/auth";
import { instance } from "./../service/index";
const RegisterPage = () => {
  const nav = useNavigate();
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(registerSchema),
  });

  const submitForm = async (data) => {
    try {
      data = {...data, "role": "user"}
      const res = await instance.post("/register", data);
      if (res.statusText === "Created") {
        nav("/login");
      }
    } catch (error) {
      console.log(error);
      toast.error(error.response.data);
    }
  };
  return (
    <>
      <form
        className="max-w-[450px] mx-auto mt-10 border rounded-md px-3"
        onSubmit={handleSubmit(submitForm)}
      >
        <h1 className="text-3xl font-bold text-center my-2">Đăng ký</h1>
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
        <div className="mb-3 flex flex-col">
          <label htmlFor="confirmPassword">Nhập lại password:</label>
          <input
            type="password"
            name="confirmPassword"
            id="confirmPassword"
            placeholder="Nhập lại mật khẩu..."
            className="w-full px-3 py-1 border mt-1"
            {...register("confirmPassword")}
          />
          {errors.confirmPassword && (
            <p className="text-red-500 italic">
              {errors.confirmPassword.message}
            </p>
          )}
        </div>
        <div className="mb-3 ">
          <p className="mb-3 text-sm">
            Bạn đã có tài khoản?{" "}
            <Link
              to="/login"
              className="italic underline hover:text-orange-500"
            >
              Đăng nhập ngay
            </Link>
          </p>
          <button className="w-full text-center bg-gradient-to-r from-cyan-500 to-blue-500 py-1 rounded-md text-white font-bold">
            Đăng ký
          </button>
        </div>
      </form>

      <ToastContainer />
    </>
  );
};

export default RegisterPage;
