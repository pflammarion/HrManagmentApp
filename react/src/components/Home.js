import React, { useState, useEffect } from "react";

import EmployeeService from "../services/employee.service";
import {Link} from "react-router-dom";

const Home = () => {
  const [total, setTotal] = useState("");

  useEffect(() => {
    EmployeeService.getTotalEmployee().then(
        (response) => {
          setTotal(response.data);
        })}, []);


    function animateValue(id, start, end, duration) {
        if (start === end) return;
        let range = end - start;
        let current = start;
        let increment = end > start? 1 : +1;
        let stepTime = Math.abs(Math.floor(duration / range));
        let obj = document.getElementById(id);
        let timer = setInterval(function() {
            current += increment;
            obj.innerHTML = current;
            if (current === end) {
                clearInterval(timer);
            }
        }, stepTime);
    }
    if (total !== ""){
        document.getElementById("value").className = "counter";
        document.getElementById("progress-r").className = "progress"
        document.getElementById("progress-l").className = "progress"
        animateValue("value", 1, total, 1000);
    }


    return (
        <div className="container">
          <header className="jumbotron">
              <div className={"emp"}>
                  <h3>We have</h3>
                  <div className={"loader"}>
                      <div className="circular">
                          <div className={"inner"}/>
                          <div id={"value"}>1</div>
                          <div className="circle">
                              <div className="bar left">
                                  <div id={"progress-l"}/>
                              </div>
                              <div className="bar right">
                                  <div id={"progress-r"}/>
                              </div>
                          </div>
                      </div>
                  </div>
                  <h3>employees</h3>
              </div>

              <p>Do you want to see all our employees?</p>
              <Link to={"/employee"}>
                  Go check this link
              </Link>
          </header>
        </div>
    );

  }


export default Home;
