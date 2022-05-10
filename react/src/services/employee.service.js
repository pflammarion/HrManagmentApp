import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:8080/api/";



const getAllEmployee = () => {
     return axios.get(API_URL + "employee", {headers: authHeader()})

}

const getEmployeeById = (id) => {
    return axios.get(API_URL + "employee/" + id, {headers: authHeader()})
}



const deleteEmployeeById = (id) =>{
    return axios.delete(API_URL + "employee/" + id, {headers: authHeader()})

}

const putEmployeeById = (id, data) => {
    return axios.put(API_URL + "employee/" + id, data,{headers: authHeader()})
}

const createNewEmployee = (data) => {
    return axios.post(API_URL + "employee", data, {headers: authHeader()})
}

const getTotalEmployee = () => {
    return axios.get(API_URL + "totalemp", {headers: authHeader()})
}





const EmployeeService = {
    getAllEmployee,
    getEmployeeById,
    deleteEmployeeById,
    getTotalEmployee,
    putEmployeeById,
    creatNewEmployee: createNewEmployee
};



export default EmployeeService;
