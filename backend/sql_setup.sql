CREATE DATABASE spm_project;
USE spm_project;

CREATE TABLE Role (
    Role_ID int,
    Role_Name varchar(20) NOT NULL,
    PRIMARY KEY (Role_ID)
);

CREATE TABLE Course (
    Course_ID varchar(20),
    Course_Name varchar(50),
    Course_Desc varchar(255),
    Course_Status varchar(15),
    Course_Type varchar(10),
    Course_Category varchar(50),
    PRIMARY KEY (Course_ID)
);

CREATE TABLE Staff (
    Staff_ID int,
    Role_ID int,
    Staff_FName varchar(50) NOT NULL,
    Staff_LName varchar(50) NOT NULL,
    Dept varchar(50) NOT NULL,
    Email varchar(50) NOT NULL,
    PRIMARY KEY (Staff_ID),
    FOREIGN KEY (Role_ID) REFERENCES Role(Role_ID)
);

CREATE TABLE Registration (
    Reg_ID int,
    Course_ID varchar(20),
    Staff_ID int,
    Reg_Status varchar(20),
    Completion_Status varchar(20),
    PRIMARY KEY (Reg_ID),
	FOREIGN KEY (Course_ID) REFERENCES Course(Course_ID),
    FOREIGN KEY (Staff_ID) REFERENCES Staff(Staff_ID)
);

INSERT INTO course VALUES('IS212','Software Project Management', 'Learn how to manage software','Active',"Physical","IT");

INSERT into Role VALUES (1, "Software Engineer");

INSERT into Staff VALUES (1, 1, "Khye","Chun", "Marketing","kcliew@gmail.com");