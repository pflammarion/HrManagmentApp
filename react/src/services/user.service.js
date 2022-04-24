import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/test/";
const API_USER = "http://localhost:8080/api/"

const getPublicContent = () => {
  return axios.get(API_URL + "all");
};

const getUserBoard = () => {
  return axios.get(API_URL + "user", { headers: authHeader() });
};

const getModeratorBoard = () => {
  return axios.get(API_URL + "mod", { headers: authHeader() });
};

const getAdminBoard = () => {
  return axios.get(API_URL + "admin", { headers: authHeader() });
};



const getAllUser = () => {
  return axios.get(API_USER + "user", {headers: authHeader()})
}


const getUserById = (id) => {
  return axios.get(API_USER + "user/" + id, {headers: authHeader()})
}


const deleteUserById = (id) =>{
  return axios.delete(API_USER + "user/" + id, {headers: authHeader()})

}


const editUserById = (id, data) => {
  return axios.put(API_USER + "user/" + id, data,{headers: authHeader()})
}



const UserService = {
  getPublicContent,
  getUserBoard,
  getModeratorBoard,
  getAdminBoard,
  getAllUser,
  deleteUserById,
  editUserById,
  getUserById
};

export default UserService;
