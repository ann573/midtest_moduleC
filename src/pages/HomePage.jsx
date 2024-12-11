import React, { useContext, useState } from "react";
import { getAllProduct } from "../service/crudProduct";
import { productContext } from "./../context/ProductProdvider";

const HomePage = () => {
  const { state, dispatch } = useContext(productContext);
  const [view, setView] = useState("gallery")
  async function searchValue(){
    console.log(event.target.value);
    // const data =  await getAllProduct(`/products?title=${event.target.value}`)
    // console.log(data);
    // dispatch({type: "SET_PRODUCTS", payload: data})
  }

  function ChangeView (viewSet) {
    setView(viewSet);
  }
  return (
    <>
      <div className="mt-5 relative">
        <i className="ri-search-line absolute left-6 top-1"></i>
        <input
          type="text"
          className="border ml-5 mb-3 px-4 py-1 w-[30%] rounded-md"
          onChange={searchValue}
          placeholder="Tìm kiếm ở đây"
        />
      </div>
      
      <div className="max-w-[1400px] mx-auto flex gap-5 mb-3 ">
      <i className="ri-gallery-view text-xl cursor-pointer" onClick={()=>ChangeView("gallery")}></i>
      <i className="ri-list-check text-xl cursor-pointer" onClick={()=>ChangeView("list")}></i>
      </div>

      {view === "gallery" ? (<section className="max-w-[1400px] mx-auto grid grid-cols-4 gap-3">
        {state.products &&
          state.products.map((item) => {
            return (
              <>
                <div className="border">
                  <div>
                    <img
                      src={item.thumbnail}
                      alt="Ảnh"
                      className="w-full"
                    />
                  </div>

                  <div className="py-2 px-2">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="my-2">
                      Price: <span className="text-red-500">${item.price}</span>
                    </p>
                    <button className="bg-green-400 p-2 rounded-lg ml-auto">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </section>) : (
        <section className="max-w-[1400px] mx-auto">
        {state.products &&
          state.products.map((item) => {
            return (
              <>
                <div className="border w-full flex mb-3 gap-3">
                  <div>
                    <img
                      src={item.thumbnail}
                      alt="Ảnh"
                      className="w-full"
                    />
                  </div>

                  <div className="py-2 px-2">
                    <h2 className="text-xl font-bold">{item.title}</h2>
                    <p className="my-2">
                      Price: <span className="text-red-500">${item.price}</span>
                    </p>
                    <p className="my-2">{item.description}</p>
                    <button className="bg-green-400 p-2 rounded-lg ml-auto">
                      Mua ngay
                    </button>
                  </div>
                </div>
              </>
            );
          })}
      </section>
      )}
      
    </>
  );
};

export default HomePage;
