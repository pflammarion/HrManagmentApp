import React, {useEffect, useState} from "react";
import EmployeeService from "../services/employee.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import {Link, useParams} from "react-router-dom";
import {button} from "react-validation/build/main";
import { useHistory ,useLocation } from 'react-router-dom';
import toInt from "validator/es/lib/toInt";
import JobService from "../services/job.service";

const EmployeeInfo = () => {
    let id  = useParams().employeeId;
    const [infoEmployee, setInfoEmployee] = useState([]);
    const [infoJob, setInfoJob] = useState([])

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then(
            (response) => {
                setInfoEmployee(response.data);
            })
    },[]);


    if (infoJob.length === 0 && infoEmployee.length !== 0){
            JobService.getJobById(infoEmployee.job).then(
                (response) => {
                    setInfoJob(response.data);
                })}


    if (infoEmployee.empId !== null){

        return(
        <>
            <Link to={"/employee"}><button>All employee list</button></Link>
            <h3>{infoJob.jobName}</h3>
            <h3>{infoEmployee.empFName} {infoEmployee.empLName}</h3>
            <h4>His age is: {infoEmployee.empAge} yo</h4>
            <h4>Contact him: <strong>{infoEmployee.empEmail}</strong></h4>
            <h4>{infoEmployee.empPhone}</h4>


        </>
    )}
    else {
        return (
            <h1>Please connect to get this resource</h1>
        )
    }
}


export default EmployeeInfo;
