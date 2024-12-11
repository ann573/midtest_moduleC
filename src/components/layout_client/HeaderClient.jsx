import React from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
const HeaderClient = () => {
  const nav = useNavigate();
  let user = localStorage.getItem("email") || "";
  user = user.split("@")[0];

  const accessToken = localStorage.getItem("accessToken");

  function Logout() {
    if (confirm("Bạn muốn đăng xuất? ")) {
      localStorage.removeItem("email", "accessToken", "role");
      nav("/login");
    }
  }
  return (
    <>
      <header className="bg-blue-500">
        <div className="max-w-[1400px] mx-auto py-2 flex items-center gap-5">
          <div>
            <Link to="/">
              <img src="../../../public/vite.svg" alt="logo" />
            </Link>
          </div>
          <nav className="mx-auto">
            <ul className="flex gap-5">
              <li>
                <NavLink to="/">Trang chủ</NavLink>
              </li>
              <li>
                <NavLink to="/category">Danh mục</NavLink>
              </li>
              <li>
                <NavLink to="/contact">Giới thiệu</NavLink>
              </li>
              <li>
                <NavLink to="/help">Hỗ trợ</NavLink>
              </li>
            </ul>
          </nav>

          <p className="text-white cursor-default">
            Hello <span className="font-bold">{user}</span>
          </p>

          {accessToken && (
            <button
              className="bg-black text-white py-1 px-2 rounded-md"
              onClick={Logout}
            >
              Logout
            </button>
          )}
        </div>
      </header>
    </>
  );
};

export default HeaderClient;
