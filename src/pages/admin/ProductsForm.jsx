import React, {useEffect, useState, useContext} from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { productSchema } from "./../../schema/product";
import { getAllProduct } from "../../service/crudProduct";
import { addProduct, updateProduct, getProductById } from './../../service/crudProduct';
import { productContext } from './../../context/ProductProdvider';
const ProductsForm = () => {
  const nav = useNavigate()
  const {dispatch} = useContext(productContext)
  const { id } = useParams();
  const [category, setCategory] = useState([])
  const {handleSubmit, register, reset, formState: {errors}} = useForm({
    resolver: zodResolver(productSchema),
  });

  useEffect(()=>{
    (async () => {
      const data = await getAllProduct("categories")
      setCategory(data)
    })() 

    if(id) {
      (async () => {
        const data = await getProductById("products", id)
        reset(data)
      })() 
    }
  },[])

  async function submitForm (dataBody){
    if (!id){
      dataBody = {dataBody, "thumbnail": "https://picsum.photos/300/300.webp"}
      const data = await addProduct("products", dataBody)
      dispatch({type: "ADD_PRODUCT", payload: data})
      nav("/admin")
    } else {
      const data = await updateProduct("products", id, dataBody)
      dispatch({type: "UPDATE_PRODUCT", payload: data})
      nav("/admin")
    }
  }
  return (
    <>
      <form className="max-w-[450px] mx-auto border mt-5 px-3" onSubmit={handleSubmit(submitForm)}>
        <h1 className="text-3xl font-bold text-center my-2">
          {id ? "Cập nhật sản phẩm" : "Thêm sản phẩm"}{" "}
        </h1>
        <div className="mb-3 flex flex-col">
          <label htmlFor="title">Tên sản phẩm:</label>
          <input
            type="text"
            name="title"
            id="title"
            placeholder="Nhập tên sản phẩm..."
            className="w-full px-3 py-1 border mt-1"
            {...register("title")}
          />
          {errors.title && (
            <p className="text-red-500 italic">{errors?.title?.message}</p>
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="title">Giá sản phẩm:</label>
          <input
            type="number"
            name="price"
            id="price"
            placeholder="Nhập giá..."
            className="w-full px-3 py-1 border mt-1"
            {...register("price", {valueAsNumber: true})}
          />
          {errors.price && (
            <p className="text-red-500 italic">{errors?.price?.message}</p>
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="description">Mô tả sản phẩm:</label>
          <textarea name="description" id="description" className="resize-none border p-3" cols="30" rows="10" {...register("description")}></textarea>
          {errors.description && (
            <p className="text-red-500 italic">{errors?.description?.message}</p>
          )}
        </div>
        <div className="mb-3 flex flex-col">
          <label htmlFor="category">Danh mục:</label>

          <select name="category" id="category" className="border" {...register("category")}>
            {category.map((item, index)=>{
              return <option value={item.slug} key={index}>{item.name}</option>
            })}
          </select>
        </div>

        <button className="w-full bg-green-500 mb-3 py-2 rounded-md text-white font-bold">{id? "Cập nhật" : "Thêm"}</button>
      </form>
    </>
  );
};

export default ProductsForm;
