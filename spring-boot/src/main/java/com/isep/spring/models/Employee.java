package com.isep.spring.models;


import javax.persistence.*;
import javax.validation.constraints.Email;

@Entity
@Table(name = "employee")
public class Employee {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long EmpId;

    private String EmpFName;

    private String EmpLName;

    private int EmpAge;

    @Email
    private String EmpEmail;

    private int EmpPhone;

    private int JobId;


    public Employee(){}

    public Employee(String EmpFName, String EmpLName, int EmpAge, String EmpEmail, int EmpPhone ){
        this.EmpFName = EmpFName;
        this.EmpLName = EmpLName;
        this.EmpAge = EmpAge;
        this.EmpEmail = EmpEmail;
        this.EmpPhone = EmpPhone;
    }

    public Long getEmpId(){
        return EmpId;
    }
    public void setEmpId(Long EmpId){this.EmpId = EmpId;}

    public String getEmpFName(){
        return EmpFName;
    }
    public void setEmpFName(String EmpFName){this.EmpFName = EmpFName;}

    public String getEmpLName(){
        return EmpLName;
    }
    public void setEmpLName(String EmpLName){this.EmpLName = EmpLName;}

    public int getEmpAge(){
        return EmpAge;
    }
    public void setEmpAge(int EmpAge){this.EmpAge = EmpAge;}

    public String getEmpEmail(){
        return EmpEmail;
    }
    public void setEmpEmail(String EmpEmail){this.EmpEmail = EmpEmail;}

    public int getEmpPhone(){
        return EmpPhone;
    }
    public void setEmpPhone(int EmpPhone){this.EmpPhone = EmpPhone;}


    public int getJob() {
        return JobId;
    }
    public void setJob(int JobId) {
        this.JobId = JobId;
    }
}