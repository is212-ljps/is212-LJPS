DROP DATABASE IF EXISTS ljps_db_test;
CREATE DATABASE ljps_db_test;
USE ljps_db_test;
CREATE TABLE `role` (`Role_ID` int AUTO_INCREMENT,`Role_Name` varchar(20) NOT NULL,CONSTRAINT `role_pk` PRIMARY KEY (`Role_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `staff` (`Staff_ID` int,`Staff_FName` varchar(50),`Staff_LName` varchar(50),`Dept` varchar(50),`Email` varchar (50),`Role_ID` int,CONSTRAINT `staff_pk` PRIMARY KEY (`Staff_ID`),CONSTRAINT `staff_fk1` FOREIGN KEY (`Role_ID`) REFERENCES role(`Role_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `job_role` (`Job_Role_ID` int AUTO_INCREMENT,`Job_Role_Name` varchar(25) NOT NULL UNIQUE,`Job_Role_Description` varchar(500),`Job_Department` varchar(25),`Is_Active` boolean DEFAULT true,CONSTRAINT `job_role_pk` PRIMARY KEY (`Job_Role_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `skill` (`Skill_ID` int AUTO_INCREMENT,`Skill_Name` varchar(25) NOT NULL UNIQUE,`Skill_Description` varchar(500),`Is_Active` boolean DEFAULT true,CONSTRAINT `skill_pk` PRIMARY KEY (`Skill_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `course` (`Course_ID` varchar(20),`Course_Name` varchar(50),`Course_Desc` varchar(255),`Course_Status` varchar(15),`Course_Type` varchar(10),`Course_Category` varchar(50),CONSTRAINT `course_pk` PRIMARY KEY (`Course_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `learning_journey` (`Learning_Journey_ID` int AUTO_INCREMENT,`Learning_Journey_Name` varchar(25) NOT NULL,`Staff_ID` int,`Job_Role_ID` int,CONSTRAINT `learning_journey_pk` PRIMARY KEY (`Learning_Journey_ID`),CONSTRAINT `learning_journey_fk1` FOREIGN KEY (`Staff_ID`) REFERENCES staff(`Staff_ID`),CONSTRAINT `learning_journey_fk2` FOREIGN KEY (`Job_Role_ID`) REFERENCES job_role(`Job_Role_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `job_role_skill` (`Job_Role_ID` int, `Skill_ID` int, CONSTRAINT `job_role_skill_pk` PRIMARY KEY (`Job_Role_ID`, `Skill_ID`),CONSTRAINT `job_role_skill_fk1` FOREIGN KEY (`Job_Role_ID`) REFERENCES job_role(`Job_Role_ID`),CONSTRAINT `job_role_skill_fk2` FOREIGN KEY (`Skill_ID`) REFERENCES skill(`Skill_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `learning_journey_course` (`Learning_Journey_ID` int, `Course_ID` varchar(20), CONSTRAINT `learning_journey_course_pk` PRIMARY KEY (`Learning_Journey_ID`, `Course_ID`),CONSTRAINT `learning_journey_course_fk1` FOREIGN KEY (`Learning_Journey_ID`) REFERENCES learning_journey(`Learning_Journey_ID`),CONSTRAINT `learning_journey_course_fk2` FOREIGN KEY (`Course_ID`) REFERENCES course(`Course_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `course_skill` (`Skill_ID` int, `Course_ID` varchar(20), CONSTRAINT `course_skill_pk` PRIMARY KEY (`Skill_ID`, `Course_ID`),CONSTRAINT `course_skill_fk1` FOREIGN KEY (`Skill_ID`) REFERENCES skill(`Skill_ID`),CONSTRAINT `course_skill_fk2` FOREIGN KEY (`Course_ID`) REFERENCES course(`Course_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `learning_journey_skill` (`Learning_Journey_ID` int,`Skill_ID` int,CONSTRAINT `learning_journey_skill_pk` PRIMARY KEY (`Learning_Journey_ID`, `Skill_ID`),CONSTRAINT `learning_journey_skill_fk1` FOREIGN KEY (`Learning_Journey_ID`) REFERENCES learning_journey(`Learning_Journey_ID`),CONSTRAINT `learning_journey_skill_fk2` FOREIGN KEY (`Skill_ID`) REFERENCES skill(`Skill_ID`) )ENGINE=InnoDB DEFAULT CHARSET=utf8;
CREATE TABLE `registration` (`Reg_ID` int,`Course_ID` varchar(20),`Staff_ID` int,`Reg_Status` varchar(20),`Completion_Status` varchar(20),CONSTRAINT `registration_pk` PRIMARY KEY (`Reg_ID`),CONSTRAINT `registration_fk1` FOREIGN KEY (`Course_ID`) REFERENCES course(`Course_ID`),CONSTRAINT `registration_fk2` FOREIGN KEY (`Staff_ID`) REFERENCES staff(`Staff_ID`))ENGINE=InnoDB DEFAULT CHARSET=utf8;
LOAD DATA INFILE '/Users/randallyeo/Desktop/Desktop Items/Y3/Y3S1/IS212 SPM/Project/is212-LJPS/backend/database/LMSRawData/courses.csv' INTO TABLE course FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/Users/randallyeo/Desktop/Desktop Items/Y3/Y3S1/IS212 SPM/Project/is212-LJPS/backend/database/LMSRawData/role.csv' INTO TABLE role FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/Users/randallyeo/Desktop/Desktop Items/Y3/Y3S1/IS212 SPM/Project/is212-LJPS/backend/database/LMSRawData/staff.csv' INTO TABLE staff FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
LOAD DATA INFILE '/Users/randallyeo/Desktop/Desktop Items/Y3/Y3S1/IS212 SPM/Project/is212-LJPS/backend/database/LMSRawData/registration.csv' INTO TABLE registration FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS;
INSERT INTO job_role (Job_Role_Name, Job_Role_Description, Job_Department) VALUES ('Marketing Manager', 'Manage marketing', 'Marketing'), ('Operations Manager', 'Manages daily operations', 'Operations'), ('HR and Admin Manager', 'Manages HR processes', 'HR'),  ('Sales Rep', 'Carry out sales', 'Operations'),('Repair Engineer', 'Carry out repairs', 'Operations'), ('Roving Service Engineer', 'Carry out servicing', 'Operations'), ('Operation Planning', 'Plans for operations', 'Operations'), ('Admin and Call Centre', 'Handles administrative tasks', 'Operations');
INSERT INTO skill (Skill_Name, Skill_Description) VALUES ('People Management', 'Ability to manage people at the workplace'), ('Online Marketing', 'Marketing on digital platforms to reach online users'), ('Canon Product Servicing', 'Troubleshooting of Canon products'), ('Network Security', 'Maintain network security and fix vulnerabilities'), ('System Architecture', 'Knowledge on fundamental concepts of system architecture');
INSERT INTO job_role_skill (Job_Role_ID, Skill_ID) VALUES (1,1), (2,1), (3,1), (8,1), (1,2), (5,3), (6,3), (5,4), (6,4), (5,5), (6,5);
INSERT INTO course_skill (Skill_ID, Course_ID) VALUES (1, 'MGT001'), (1, 'MGT002'), (1, 'MGT004'), (2, 'SAL003'), (3, 'tch003'), (4, 'tch013'), (4, 'tch014'), (4, 'tch015'), (5, 'COR001');
INSERT INTO learning_journey (Learning_Journey_Name, Staff_ID, Job_Role_ID) VALUES ('Repair Engineer Learning Journey', '130002', 5);
INSERT INTO learning_journey_skill (Learning_Journey_ID, Skill_ID) VALUES (1, 3), (1, 4), (1, 5);
INSERT INTO learning_journey_course (Learning_Journey_ID, Course_ID) VALUES (1, 'tch003'), (1, 'tch013'), (1, 'COR001');




    