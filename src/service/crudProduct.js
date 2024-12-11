
import { instance } from './index';
export const addProduct = async (path, data) =>{
    try {
        const res = await instance.post(`/${path}`, data)
        return res.data
    } catch (error) {
        console.log(error)
        toast("Có lỗi xảy ra")
    }
}
export const removeProduct = async (path, id) =>{
    try {
        const res = await instance.delete(`/${path}/${id}`)
        return res
    } catch (error) {
        console.log(error)
        toast("Có lỗi xảy ra")

    }
}
export const updateProduct = async (path, id, data) =>{
    try {
        const res = await instance.patch(`/${path}/${id}`, data)
        return res.data
    } catch (error) {
        console.log(error)
        toast("Có lỗi xảy ra")

    }
}
export const getAllProduct = async (path) =>{
    try {
        const res = await instance.get(`/${path}`)
        return res.data
    } catch (error) {
        console.log(error)
    }
}
export const getProductById = async (path,id) =>{
    try {
        const res = await instance.get(`/${path}/${id}`)
        return res.data
    } catch (error) {
        console.log(error)
        toast("Có lỗi xảy ra")

    }
}