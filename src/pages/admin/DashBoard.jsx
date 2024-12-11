import React, { useContext } from "react";
import { productContext } from "./../../context/ProductProdvider";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from 'react-toastify';
import { removeProduct } from "../../service/crudProduct";

const DashBoard = () => {
  const { state, dispatch } = useContext(productContext);
  
  async function removeProducts(id){
    if (confirm("Bạn có chắc chắn muốn xóa không? ")){
      try {
        const res = await removeProduct("products", id)
        if(res.status===200){
          dispatch({type: "REMOVE_PRODUCT", payload: id})
        }
      } catch (error) {
        toast.error(error.response)
      }
    }
  }
  return (
    <>
      <section className="max-w-[1400px] mx-auto">
        <Link to="/admin/add" className="bg-green-500 px-2 py-1 rounded-md">
          Add Products
        </Link>

        <table className="border-collapse border border-slate-500 mt-5 w-full">
          <thead>
            <tr className="text-center">
              <th className="border-collapse border border-slate-500 w-[3%]">
                ID
              </th>
              <th className="border-collapse border border-slate-500">Title</th>
              <th className="border-collapse border border-slate-500">Price</th>
              <th className="border-collapse border border-slate-500">Stock</th>
              <th className="border-collapse border border-slate-500">
                Description
              </th>
              <th className="border-collapse border border-slate-500  w-[20%]">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {state.products.map((item, index) => {
              return (
                <tr key={index}>
                  <td className="border-collapse border border-slate-500 text-center">
                    {item.id}
                  </td>
                  <td className="border-collapse border border-slate-500 text-center">
                    {item.title}
                  </td>
                  <td className="border-collapse border border-slate-500 text-center">
                    {item.price}
                  </td>
                  <td className="border-collapse border border-slate-500 text-center">
                    {item.stock}
                  </td>
                  <td className="border-collapse border border-slate-500 text-center">
                    {item.description}
                  </td>
                  <td className="border-collapse border border-slate-500 text-center py-2">
                    <button className="bg-red-500 p-1 rounded-md" onClick={()=>{removeProducts(item.id)}}>
                      Remove
                    </button>
                    <button className="bg-yellow-500 ml-3 p-1 rounded-md">
                      <Link to={`/admin/update/${item.id}`}>Update</Link>
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </section>
      <ToastContainer/>
    </>
  );
};

export default DashBoard;
