USE ljps_db;

INSERT INTO job_role (Job_Role_Name, Job_Role_Description, Job_Department) VALUES ('Marketing Manager', 'Manage marketing', 'Marketing'), ('Operations Manager', 'Manages daily operations', 'Operations'), ('HR and Admin Manager', 'Manages HR processes', 'HR'),  ('Sales Rep', 'Carry out sales', 'Operations'),('Repair Engineer', 'Carry out repairs', 'Operations'), ('Roving Service Engineer', 'Carry out servicing', 'Operations'), ('Operation Planning', 'Plans for operations', 'Operations'), ('Admin and Call Centre', 'Handles administrative tasks', 'Operations');
	
INSERT INTO skill (Skill_Name, Skill_Description) VALUES ('People Management', 'Ability to manage people at the workplace'), ('Online Marketing', 'Marketing on digital platforms to reach online users'), ('Canon Product Servicing', 'Troubleshooting of Canon products'), ('Network Security', 'Maintain network security and fix vulnerabilities'), ('System Architecture', 'Knowledge on fundamental concepts of system architecture');

INSERT INTO job_role_skill (Job_Role_ID, Skill_ID) VALUES (1,1), (2,1), (3,1), (8,1), (1,2), (5,3), (6,3), (5,4), (6,4), (5,5), (6,5);
    
INSERT INTO course_skill (Skill_ID, Course_ID) VALUES (1, 'MGT001'), (1, 'MGT002'), (1, 'MGT004'), (2, 'SAL003'), (3, 'tch003'), (4, 'tch013'), (4, 'tch014'), (4, 'tch015'), (5, 'COR001');
    
INSERT INTO learning_journey (Learning_Journey_Name, Staff_ID, Job_Role_ID) VALUES ('Repair Engineer Learning Journey', '130002', 5);
	
INSERT INTO learning_journey_skill (Learning_Journey_ID, Skill_ID) VALUES (1, 3), (1, 4), (1, 5);

INSERT INTO learning_journey_course (Learning_Journey_ID, Course_ID) VALUES (1, 'tch003'), (1, 'tch013'), (1, 'COR001');




    