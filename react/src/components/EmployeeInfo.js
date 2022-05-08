import React, {useEffect, useState} from "react";
import EmployeeService from "../services/employee.service";
import {Link, useParams} from "react-router-dom";
import {button} from "react-validation/build/main";
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
        <div className={"more"}>
            <Link to={"/employee"}><button>All employee list</button></Link>
            <div className={"container"}>
                <h3>{infoEmployee.empFName} {infoEmployee.empLName} {infoJob.jobName}</h3>
                <h4>Age: {infoEmployee.empAge} yo</h4>
                <h4>Email: {infoEmployee.empEmail}</h4>
                <h4>Phone: {infoEmployee.empPhone}</h4>
            </div>

        </div>
    )}
    else {
        return (
            <h1>Please connect to get this resource</h1>
        )
    }
}


export default EmployeeInfo;
