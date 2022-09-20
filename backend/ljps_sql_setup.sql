CREATE DATABASE ljps_db;
USE ljps_db;

CREATE TABLE "role" (
	"Role_ID" int AUTO_INCREMENT,
    "Role_Name" varchar(20) NOT NULL,
    PRIMARY KEY ("Role_ID")
);

CREATE TABLE "user" (
	"User_ID" int AUTO_INCREMENT,
    "Username" varchar(25) NOT NULL,
    "Role_ID" int,
    PRIMARY KEY ("User_ID"),
    FOREIGN KEY ("Role_ID") REFERENCES role("Role_ID")
);

CREATE TABLE "job_role" (
	"Job_Role_ID" int AUTO_INCREMENT,
    "Job_Role_Name" varchar(25) NOT NULL,
    "Job_Role_Description" varchar(500),
    "Job_Department" varchar(25),
    "Is_Active" boolean DEFAULT true,
    PRIMARY KEY ("Job_Role_ID")
);

CREATE TABLE "skill" (
	"Skill_ID" int AUTO_INCREMENT,
    "Skill_Name" varchar(25) NOT NULL,
	"Skill_Description" varchar(500),
    "Is_Active" boolean DEFAULT true,
    PRIMARY KEY ("Skill_ID")
);

CREATE TABLE "course" (
    "Course_ID" varchar(20),
    "Course_Name" varchar(50),
    "Course_Desc" varchar(255),
    "Course_Status" varchar(15),
    "Course_Type" varchar(10),
    "Course_Category" varchar(50),
    PRIMARY KEY ("Course_ID")
);

CREATE TABLE "learning_journey" (
	"Learning_Journey_ID" int AUTO_INCREMENT,
	"Learning_Journey_Name" varchar(25) NOT NULL,
	"Learning_Journey_Description" varchar(300),
	"User_ID" int,
	"Job_Role_ID" int,
    PRIMARY KEY ("Learning_Journey_ID"),
    FOREIGN KEY ("User_ID") REFERENCES user("User_ID"),
    FOREIGN KEY ("Job_Role_ID") REFERENCES job_role("Job_Role_ID")
);

CREATE TABLE "job_role_skill" (
	"Role_ID" int, 
	"SKill_ID" int, 
    PRIMARY KEY ("Role_ID", "Skill_ID"),
    FOREIGN KEY ("Role_ID") REFERENCES role("Role_ID"),
    FOREIGN KEY ("SKill_ID") REFERENCES skill("SKill_ID")
);

CREATE TABLE "learning_journey_course" (
	"Learning_Journey_ID" int, 
	"Course_ID" int, 
    PRIMARY KEY ("Learning_Journey_ID", "Course_ID"),
    FOREIGN KEY ("Learning_Journey_ID") REFERENCES learning_journey("Learning_Journey_ID"),
    FOREIGN KEY ("Course_ID") REFERENCES course("Course_ID")
);

CREATE TABLE "course_required_skill" (
	"Role_ID" int, 
	"Course_ID" int, 
    PRIMARY KEY ("Role_ID", "Course_ID"),
    FOREIGN KEY ("Role_ID") REFERENCES role("Role_ID"),
    FOREIGN KEY ("Course_ID") REFERENCES course("Course_ID")
);