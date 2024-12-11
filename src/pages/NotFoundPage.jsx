import React from "react";
import {Link} from 'react-router-dom'
const NotFoundPage = () => {
  return (
    <>
      <section className="text-center font-bold text-[80px]">
        <h1 >404</h1>
        <p >Not Found</p>

        <p className="text-xl">Quay lại <Link to="/" className="underline italic hover:text-blue-500">trang chủ</Link></p>
      </section>
    </>
  );
};

export default NotFoundPage;
