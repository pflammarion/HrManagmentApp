import React, {useEffect, useState} from "react";
import AuthService from "../services/auth.service";
import EmployeeService from "../services/employee.service";

const Profile = () => {
    const currentUser = AuthService.getCurrentUser();

        return (
            <div className="container">
                <header className="jumbotron">
                    <h3>
                        <strong>Welcome</strong> to your profile
                    </h3>
                </header>
                <h3>Account info:</h3>
                <p>
                    <strong>Username: </strong>{currentUser.username}
                </p>
                <p>
                    <strong>Email:</strong> {currentUser.email}
                </p>
                <strong>Authorities:</strong>
                <ul>
                    {currentUser.roles &&
                        currentUser.roles.map((role, index) => <p key={index}>{role}</p>)}
                </ul>
            </div>
        )
};


export default Profile;
