import React, {useEffect, useState} from 'react';
import AuthService from "../services/auth.service";
import {Link, useParams} from "react-router-dom";
import EmployeeService from "../services/employee.service";
import {button} from "react-validation";
import JobService from "../services/job.service";

const EditEmployee = () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let id  = useParams().employeeId;
    let data;
    const [infoJob, setInfoJob] = useState([])
    const [infoEmployee, setInfoEmployee] = useState([]);
    const [empFName, setEmpFName] = useState("");
    const [empLName, setEmpLName] = useState("");
    const [empAge, setEmpAge] = useState("");
    const [empEmail, setEmpEmail] = useState("");
    const [empPhone, setEmpPhone] = useState("");
    const [job, setJob] = useState("");
    const [jobList, setJobList] = useState([])

    useEffect(() => {
        EmployeeService.getEmployeeById(id).then(
            (response) => {
                setInfoEmployee(response.data);
                setEmpFName(response.data.empFName);
                setEmpLName(response.data.empLName);
                setEmpAge(response.data.empAge);
                setEmpEmail(response.data.empEmail);
                setEmpPhone(response.data.empPhone);
                setJob(response.data.job)
            })
        JobService.getAllJob().then(
            (response)=>{
            setJobList(response.data)
            }
        )
    }, []);


    let handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById("load").style.visibility = "visible";
        try {
            await delay(3000)
            data ={
                empFName: empFName,
                empLName: empLName,
                empAge: empAge,
                empEmail: empEmail,
                empPhone: empPhone,
                job: job
            }
            const res = await EmployeeService.putEmployeeById(id, data);
            if (res.status === 202){
                document.getElementById("load").style.visibility = "hidden";
                document.getElementById("ok").style.visibility = "visible";
                await delay(3000)
                document.getElementById("ok").style.visibility = "hidden";
                window.location.replace("/employee")

            }else {
                document.getElementById("load").style.visibility = "hidden";
                document.getElementById("error").style.visibility = "visible";
                await delay(3000);
                document.getElementById("error").style.visibility = "hidden";
            }
        }catch (err) {
            console.log(err);
            document.getElementById("load").style.visibility = "hidden";
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

    if (infoJob.length === 0 && infoEmployee.length !== 0){
        JobService.getJobById(infoEmployee.job).then(
            (response) => {
                setInfoJob(response.data);
            })}

    if(AuthService.getCurrentUser() != null)
    return (
        <div>
            <div id={"load"} className={"load"}><h1>Loading...</h1></div>
            <div id={"ok"} className={"ok"}><h1>Content changed</h1></div>
            <div id={"error"} className={"error"}><h1>Error</h1></div>
            <a href={"/employee"}><button>All employee list</button></a>

            <form>
                <label>
                    First Name :
                    <input type="text" name="empFName" defaultValue={infoEmployee.empFName} onChange={onChangeFName}  />
                </label>
                <label>
                    Last Name :
                    <input type="text" name="empLName" onChange={onChangeLName} defaultValue={infoEmployee.empLName} />
                </label>
                <label>
                    Age :
                    <input type="text" name="empAge" onChange={onChangeAge} defaultValue={infoEmployee.empAge} />
                </label>
                <label>
                    Email:
                    <input type="text" name="empEmail" onChange={onChangeEmail} defaultValue={infoEmployee.empEmail} />
                </label>
                <label>
                    Phone number :
                    <input type="text" name="empPhone" onChange={onChangePhone} defaultValue={infoEmployee.empPhone} />
                </label>
                <label>
                    Job :
                    <select onChange={onChangeJob} value={job}>
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

export default EditEmployee;