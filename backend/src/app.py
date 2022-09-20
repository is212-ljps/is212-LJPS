from flask import Flask 
app = Flask(__name__)
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy import ForeignKey
from flask_cors import CORS
from sqlalchemy.orm import relationship


app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://root@localhost:3306/spm_project'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy(app)

CORS(app)  

class course(db.Model):
    __tablename__ = 'course'

    Course_ID = db.Column(db.String(20), primary_key=True)
    Course_Name = db.Column(db.String(50), nullable=False)
    Course_Desc = db.Column(db.String(255), nullable=False)
    Course_Status = db.Column(db.String(15), nullable=False)
    Course_Type = db.Column(db.String(10), nullable=False)
    Course_Category = db.Column(db.String(50), nullable=False)


    def __init__(self, Course_ID, Course_Name, Course_Desc, Course_Status, Course_Type, Course_Category):
        self.Course_ID = Course_ID
        self.Course_Name = Course_Name
        self.Course_Desc = Course_Desc
        self.Course_Status = Course_Status
        self.Course_Type = Course_Type
        self.Course_Category  = Course_Category


    def json(self):
        return {"Course_ID": self.Course_ID, 
        "Course_Name": self.Course_Name, 
        "Course_Desc": self.Course_Desc, 
        "Course_Status": self.Course_Status,
        "Course_Type": self.Course_Type,
        "Course_Category": self.Course_Category}


class role(db.Model):
    __tablename__ = 'role'


    Role_ID = db.Column(db.Integer, primary_key=True)
    Role_Name = db.Column(db.String(20), nullable=False)

    def __init__(self, Role_ID, Role_Name):
        self.Role_ID = Role_ID
        self.Role_Name = Role_Name

    def json(self):
        return {"Role_ID": self.Role_ID, 
        "Role_Name": self.Role_Name, }


class Staff(db.Model):
    __tablename__ = 'Staff'

    parent= relationship("role", backref='children')


    Staff_ID = db.Column(db.Integer, primary_key=True)
    Role_ID = db.Column(db.Integer, ForeignKey('role.Role_ID'))
    Staff_FName= db.Column(db.String(50), nullable=False)
    Staff_LName= db.Column(db.String(50), nullable=False)
    Dept= db.Column(db.String(50), nullable=False)
    Email= db.Column(db.String(50), nullable=False)



    def __init__(self,  Staff_ID, Role_ID, Staff_FName,  Staff_LName, Dept, Email):
        self.Staff_ID = Staff_ID
        self.Role_ID = Role_ID
        self.Staff_FName = Staff_FName
        self.Staff_LName = Staff_LName
        self.Dept = Dept
        self.Email = Email





    def json(self):
        return {"Staff_ID": self.Staff_ID, 
        "Role_ID": self.Role_ID,
        "Staff_FName": self.Staff_FName,
        "Staff_LName": self.Staff_LName,
        "Dept": self.Dept,
        "Email": self.Email,}



@app.route("/")
def home():
    return "I fucking love flask"

@app.route("/test")
def test_directory():
    return "Hosehbo"

# //--------------Courses--------------------------
@app.route('/courses')
def get_all_courses():
    courses = course.query.all()
    print(courses)
    print('git test')

    return "Get All Courses"

# //--------------Roles--------------------------

@app.route('/roles')
def get_all_roles():
    roles = role.query.all()
    print(roles)

    return "Get All Roles"

# //--------------Staff--------------------------
@app.route('/staffs')
def get_all_staff():
    staffs = Staff.query.all()
    print(staffs)

    return "Get All Staff"


if __name__ == '__main__':
    app.run(host="0.0.0.0", port=5000, debug=True)
