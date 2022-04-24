package com.isep.spring.controllers;

import com.isep.spring.models.Employee;
import com.isep.spring.repository.EmployeeRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@CrossOrigin(origins = "*", maxAge = 3600)
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/")
public class EmployeeController {

    @Autowired
    EmployeeRepository employeeRepository;


    @GetMapping("employee")
    public ResponseEntity<List<Employee>> getAllEmployee() {
        return ResponseEntity.ok(employeeRepository.findAll());
    }

    @GetMapping("employee/{id}")
    public ResponseEntity getEmployeeById(@PathVariable Long id) {
        return employeeRepository.findById(id)
                .map(ResponseEntity::ok)
                .orElse(ResponseEntity.status(HttpStatus.NOT_FOUND).build());
    }

    @DeleteMapping("employee/{id}")
    public ResponseEntity deleteEmployeeById(@PathVariable Long id) {
        employeeRepository.deleteById(id);
        return ResponseEntity.status(HttpStatus.ACCEPTED).build();
    }

    @PostMapping(path = "employee")
    public ResponseEntity<Employee> addEmployee(@RequestBody Employee employee) {
        var saveEmployee = employeeRepository.save(employee);
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(saveEmployee);
    }

    @PutMapping(path="employee/{id}")
    public ResponseEntity updateEmployeeById(@RequestBody Employee employee, @PathVariable Long id) {
        Optional<Employee> optionalEmployee = employeeRepository.findById(id);
        if (optionalEmployee.isPresent()) {
            Employee _employee = optionalEmployee.get();
            _employee.setEmpFName(employee.getEmpFName());
            _employee.setEmpLName(employee.getEmpLName());
            _employee.setEmpAge(employee.getEmpAge());
            _employee.setEmpPhone(employee.getEmpPhone());
            _employee.setEmpEmail(employee.getEmpEmail());
            _employee.setJob(employee.getJob());

            return ResponseEntity.status(HttpStatus.ACCEPTED).body(employeeRepository.save(_employee));
        } else return ResponseEntity.status(HttpStatus.NOT_FOUND).build();

    }
    @GetMapping("employee/total")
    public ResponseEntity getTotal() {
        return ResponseEntity.ok(employeeRepository.count());
    }
}

