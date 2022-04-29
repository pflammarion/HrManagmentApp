import axios from "axios";
import authHeader from "./auth-header";
import AuthService from "./auth.service";
import {useParams} from "react-router-dom";

const API_URL = "http://localhost:8080/api/";



const getAllJob = () => {
    return axios.get(API_URL + "job", {headers: authHeader()})

}

const getJobById = (id) => {
    return axios.get(API_URL + "job/" + id, {headers: authHeader()})
}



const deleteJobById = (id) =>{
    return axios.delete(API_URL + "job/" + id, {headers: authHeader()})

}

const putJobById = (id, data) => {
    return axios.put(API_URL + "job/" + id, data,{headers: authHeader()})
}

const createNewJob = (data) => {
    return axios.post(API_URL + "job/", data, {headers: authHeader()})
}



const JobService = {
    getAllJob,
    getJobById,
    putJobById,
    createNewJob,
    deleteJobById
};



export default JobService;
