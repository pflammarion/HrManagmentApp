import React, {useEffect, useState} from "react";
import EmployeeService from "../services/employee.service";
import AuthService from "../services/auth.service";
import EventBus from "../common/EventBus";
import {Link} from "react-router-dom";
import {button} from "react-validation";
import dataService from "../services/employee.service";
import JobService from "../services/job.service";
import UserService from "../services/user.service";

const UserList = () => {
    const userURL = "/user/"
    const [userList, setUserList] = useState([]);
    const [showModeratorBoard, setShowModeratorBoard] = useState(false);
    const [showAdminBoard, setShowAdminBoard] = useState(false);
    const [currentUser, setCurrentUser] = useState(undefined);

    useEffect(() => {
        const user = AuthService.getCurrentUser();
        if (user) {
            setCurrentUser(user);
            setShowModeratorBoard(user.roles.includes("ROLE_MODERATOR"));
            setShowAdminBoard(user.roles.includes("ROLE_ADMIN"));
        }
        UserService.getAllUser().then(
            (response) => {
                setUserList(response.data);
            })

    },[]);

    function deleteUser (id){
        UserService.deleteUserById(id).then((res) => window.location.reload());
    }

    console.log(userList)
    if (currentUser !== null){
        return(
            <>
                <div className={"employee-choice"}>
                    {(showModeratorBoard || showAdminBoard) &&(
                        <Link to={"/register"} className="nav-link">
                            <button>Create new user</button>
                        </Link>
                    )}
                </div>
                <table>
                    <thead>
                    <tr>
                        <td><h6>Username</h6></td>
                        <td><h6>Email</h6></td>
                        <td><h6>Role</h6></td>
                    </tr>
                    </thead>
                    <tbody>
                    {userList.map((val, key)=> {
                        return(
                            <tr key = {val.uid}>
                                <td><p>{val.username}</p></td>
                                <td><p>{val.email}</p></td>
                                <td><p>{val.roles[0].name}</p></td>

                                {showAdminBoard && (
                                    <button onClick={() => deleteUser(val.uid)}>Delete</button>
                                )}

                                {showAdminBoard &&
                                    <Link to={userURL + "edit/" + val.uid}>
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




export default UserList;
