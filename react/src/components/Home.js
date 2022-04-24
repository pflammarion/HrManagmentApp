import React, { useState, useEffect } from "react";

import UserService from "../services/user.service";
import EmployeeService from "../services/employee.service";
import {Link} from "react-router-dom";

const Home = () => {
  const [total, setTotal] = useState("");

  useEffect(() => {
    EmployeeService.getTotalEmployee().then(
        (response) => {
          setTotal(response.data);
        })}, []);

    return (
        <div className="container">
          <header className="jumbotron">
            <h3>We have {total} employees</h3>
              <p>Do you want to see all our employees?</p>
              <Link to={"/employee"}>
                  Go check this link
              </Link>
          </header>
        </div>
    );

  }


export default Home;
