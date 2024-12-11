import React from "react";
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import {Routes, Route} from 'react-router-dom'
import ProductProdvider from './context/ProductProdvider';
import LayoutClient from "./components/layout_client/LayoutClient";
import HomePage from "./pages/HomePage";
import NotFoundPage from './pages/NotFoundPage';
import RegisterPage from './pages/RegisterPage';
import LoginPage from './pages/LoginPage';
import LayoutAdmin from './components/layout_admin/LayoutAdmin';
import DashBoard from './pages/admin/DashBoard';
import ProductsForm from './pages/admin/ProductsForm';

const App = () => {
	return (
		<>
			<ProductProdvider>
				<Routes>
					<Route path="/" element={<LayoutClient/>}>
						<Route index element={<HomePage/>}/>
					</Route>
					<Route path="/admin" element={<LayoutAdmin/>}>
						<Route index element={<DashBoard/>}/>
						<Route path="add" element={<ProductsForm/>}/>
						<Route path="update/:id" element={<ProductsForm/>}/>
					</Route>

					<Route path="/login" element={<LoginPage/>}/>
					<Route path="/register" element={<RegisterPage/>}/>
					<Route path="*" element={<NotFoundPage/>}/>
				</Routes>
			</ProductProdvider>
		</>
	);
};

export default App;
