import React, {useEffect, useState} from "react";
import EmployeeService from "../services/employee.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import {Link} from "react-router-dom";
import {button} from "react-validation";
import dataService from "../services/employee.service";
import JobService from "../services/job.service";

const EmployeeList = () => {
    const EmployeeURL = "/employee/"
    const [employeeList, setEmployeeList] = useState([]);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);
    const [jobList, setJobList] = useState([])

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }

        JobService.getAllJob().then(
            (response) => {
                setJobList(response.data);
        })
        EmployeeService.getAllEmployee().then(
            (response) => {
                setEmployeeList(response.data);
            }
    )},[]);

    function deleteEmployee (id){
        dataService.deleteEmployeeById(id).then((res) => window.location.reload());

    }

    if (currentUser !== null){
    return(
            <>
                <div className={"employee-choice"}>
                {(showModeratorBoard || showAdminBoard) &&(
                    <Link to={EmployeeURL + "create"}>
                    <button>Add New Employee</button>
                </Link>
                    )}
                </div>
                <table>
                    <thead>
                    <tr>
                        <td><h6>Employee First Name</h6></td>
                        <td><h6>Employee Last Name</h6></td>
                        <td><h6>Employee Job</h6></td>
                    </tr>
                    </thead>
                    <tbody>
                    {employeeList.map((val, key)=> {
                            return(
                                <tr key = {val.empId}>
                                    <td><p>{val.empFName}</p></td>
                                    <td><p>{val.empLName}</p></td>
                                    {jobList.filter(job => job.jobId === val.job).map((val2) =>(
                                           <td><p>{val2.jobName}</p></td>
                                        ))}
                                    {(showModeratorBoard || showAdminBoard) &&(
                                        <Link to={EmployeeURL + val.empId}>
                                            <button>
                                                More
                                            </button>
                                        </Link>
                                    )}

                                    {showAdminBoard && (
                                        <button onClick={() => deleteEmployee(val.empId)}>Delete</button>
                                    )}

                                    {showAdminBoard &&
                                        <Link to={EmployeeURL + "edit/" + val.empId}>
                                            <button>Edit</button>
                                        </Link>
                                    }
                                </tr>
                            )
                        })
                    }
                    </tbody>
                </table>

            </>
    )}
    else {
        return (
            <h1>Please connect to get this resource</h1>
        )
    }
    }




export default EmployeeList;
