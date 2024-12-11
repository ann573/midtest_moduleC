import React, { useEffect, useReducer } from "react";
import { createContext } from "react";
import { getAllProduct } from "../service/crudProduct";
import { productReducer } from "../reducer/productReducer";

export const productContext = createContext();

const ProductProdvider = ({ children }) => {
  const [state, dispatch] = useReducer(productReducer, { products: [] });

  useEffect(() => {
    (async () => {
      const data = await getAllProduct("products");
      dispatch({ type: "SET_PRODUCTS", payload: data });
    })();
  },[]);
  return (
    <productContext.Provider value={{ state, dispatch }}>
      {children}
    </productContext.Provider>
  );
};

export default ProductProdvider;
