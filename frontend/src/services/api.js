import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api"
});

API.interceptors.request.use((config) => {
    const token = localStorage.getItem("token");
    if (token) {
        config.headers.Authorization = `Bearier ${token}`;
    }
    return config;
});

export const registerUser = (data) => API.post("/auth/register", data);
export const loginUser = (data) => API.post("/auth/register", data);
export const getProfile = () => API.get("/auth/me");

export const getProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);

export const getCategories =()=> API.get("/Categories");

export const getCart =()=> API.get("/Cart");
export const addToCart =(data)=> API.post("/Cart",data);
export const removeFromCart =(id)=> API.delete(`/Cart/${id}`);
export const clearCart = () =>API.delete("/cart/clear");

export default API;