package com.isep.spring;

import com.isep.spring.controllers.EmployeeController;
import com.isep.spring.controllers.JobController;
import org.junit.jupiter.api.Test;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.context.SpringBootTest.WebEnvironment;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest(webEnvironment = WebEnvironment.RANDOM_PORT)
public class HttpControllerTest {

    @LocalServerPort
    private int port = 8080;

    @Autowired
    EmployeeController employeeController;

    @Autowired
    JobController jobController;


    @Test
    public void testEmployeeController() {
        ResponseEntity responseEntity = employeeController.getAllEmployee();
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }
    @Test
    public void testJobController() {
        ResponseEntity responseEntity = jobController.getAllJob();
        assertThat(responseEntity.getStatusCode()).isEqualTo(HttpStatus.OK);
    }

}