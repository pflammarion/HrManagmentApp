import React, {useEffect, useState} from 'react';
import AuthService from "../services/auth.service";
import {Link, useParams} from "react-router-dom";
import EmployeeService from "../services/employee.service";
import {button} from "react-validation";
import JobService from "../services/job.service";
import UserService from "../services/user.service";

const EditUser = () => {
    const delay = ms => new Promise(res => setTimeout(res, ms));
    let id  = useParams().userId;
    let data;
    const [infoUser, setInfoUser] = useState([]);
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState(null);

    useEffect(() => {
        UserService.getUserById(id).then(
            (response) => {
                setInfoUser(response.data);
                setUsername(response.data.username);
                setEmail(response.data.email);
                setRole(response.data.roles[0].id);
            })
    }, []);


    let handleSubmit = async (e) => {
        e.preventDefault();
        document.getElementById("load").style.visibility = "visible";
        try {
            await delay(3000)
            data ={
                username: username,
                password: password,
                email: email,
                role: role
            }
            const res = await UserService.editUserById(id, data);

            if (res.status === 202){
                document.getElementById("load").style.visibility = "hidden";
                document.getElementById("ok").style.visibility = "visible";
                await delay(3000)
                document.getElementById("ok").style.visibility = "hidden";
                window.location.replace("/user")

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

    const onChangeUsername = (e) => {
        let username = e.target.value;
        setUsername(username);
    };

    const onChangePassword = (e) => {
        const password = e.target.value;
        setPassword(password);
    };


    const onChangeEmail = (e) => {
        const email = e.target.value;
        setEmail(email);
    };

    const onChangeRole = (e) => {
        let role = e.target.value;
        setRole(role);
    };


    if(AuthService.getCurrentUser() != null)
        return (
            <div>
                <div id={"load"} className={"load"}><h1>Loading...</h1></div>
                <div id={"ok"} className={"ok"}><h1>Content changed</h1></div>
                <div id={"error"} className={"error"}><h1>Error</h1></div>
                <a href={"/user"}><button>All user list</button></a>

                <form>
                    <label>
                        Username :
                        <input type="text" name="empFName" defaultValue={infoUser.username} onChange={onChangeUsername}  />
                    </label>

                    <label>
                        Email :
                        <input type="email" name="empAge" onChange={onChangeEmail} defaultValue={infoUser.email} />
                    </label>

                    <label>
                        Role :
                        <select onChange={onChangeRole} value={role}>
                            <option name={"role"} value={1}>User</option>
                            <option name={"role"} value={2}>Moderator</option>
                            <option name={"role"} value={3}>Admin</option>
                        </select>
                    </label>

                    <label>
                        Please enter Password :
                        <input type="password"
                               name="empLName"
                               onChange={onChangePassword}/>
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

export default EditUser;