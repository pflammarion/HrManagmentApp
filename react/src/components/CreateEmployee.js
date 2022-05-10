import React, {useEffect, useState} from 'react';
import {Link} from "react-router-dom";
import EmployeeService from "../services/employee.service";
import AuthService from "../services/auth.service";
import {button} from "react-validation";
import JobService from "../services/job.service";

const CreateEmployee = () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let data;
    const [jobList, setJobList] = useState([])
    const [empFName, setEmpFName] = useState("");
    const [empLName, setEmpLName] = useState("");
    const [empAge, setEmpAge] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [empPhone, setEmpPhone] = useState("");
    const [job, setJob] = useState("");


    useEffect(() => {
        JobService.getAllJob().then(
            (response)=>{
                setJobList(response.data)
            }
        )
    }, []);

    let handleSubmit = async (e) => {
        e.preventDefault();
        try {
            data ={
                empFName: empFName,
                empLName: empLName,
                empAge: empAge,
                empEmail: empEmail,
                empPhone: empPhone,
                job: job
            }
            const res = await EmployeeService.creatNewEmployee(data);
            if (res.status === 201){
                document.getElementById("ok").style.visibility = "visible";
                await delay(1000)
                document.getElementById("ok").style.visibility = "hidden";
                window.location.replace("/employee")

            }else {
                document.getElementById("error").style.visibility = "visible";
                await delay(3000);
                document.getElementById("error").style.visibility = "hidden";
            }
        }catch (err) {
            console.log(err);
            document.getElementById("error").style.visibility = "visible";
            await delay(3000);
            document.getElementById("error").style.visibility = "hidden";
        }
    }

    const onChangeFName = (e) => {
        let empFName = e.target.value;
        setEmpFName(empFName);
    };

    const onChangeLName = (e) => {
        const empLName = e.target.value;
        setEmpLName(empLName);
    };


    const onChangeAge = (e) => {
        const empAge = e.target.value;
        setEmpAge(empAge);
    };

    const onChangeEmail = (e) => {
        const empEmail = e.target.value;
        setEmpEmail(empEmail);
    };

    const onChangePhone = (e) => {
        const empPhone = e.target.value;
        setEmpPhone(empPhone);
    };



    const onChangeJob = (e) => {
        let job = e.target.value;
        setJob(job);
    };


    if(AuthService.getCurrentUser() != null)
        return (
            <div>
                <div id={"ok"} className={"ok"}><h1>Content changed</h1></div>
                <div id={"error"} className={"error"}><h1>Error</h1></div>
                <Link to={"/employee"}><button>All employees list</button></Link>

                <form>
                    <label>
                        First Name :
                        <input type="text" name="empFName" onChange={onChangeFName}  />
                    </label>
                    <label>
                        Last Name :
                        <input type="text" name="empLName" onChange={onChangeLName}  />
                    </label>
                    <label>
                        Age :
                        <input type="text" name="empAge" onChange={onChangeAge}  />
                    </label>
                    <label>
                        Email:
                        <input type="text" name="empEmail" onChange={onChangeEmail}  />
                    </label>
                    <label>
                        Phone number :
                        <input type="text" name="empPhone" onChange={onChangePhone}  />
                    </label>
                    <label>
                        Job :
                        <select onChange={onChangeJob}>
                            <option value={"blank"}>- - - -</option>
                            {jobList.map((val, key) => {
                                return(
                                    <option key={key} value={val.jobId}>{val.jobName}</option>
                                )
                            })}
                        </select>
                    </label>
                    <button type={"submit"} onClick={handleSubmit}>Submit</button>
                </form>

            </div>
        );
    else {
        return (
            <h1>Please connect to get this resource</h1>
        )
    }
};
export default CreateEmployee;