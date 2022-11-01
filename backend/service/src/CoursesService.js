const utils = require('../../util')

function coursesService(database) {
  const coursesService = {};

  coursesService.getCourses = async () => {
    try {
      return await database.getCourses();
    } catch (err) {
      throw err;
    }
  };

  coursesService.getCoursesBySkill = async (skillId) => {
    if(!skillId){
      return false
    }
    try {
      return await database.getCoursesBySkill(skillId);
    } catch (err) {
      throw err;
    }
  };

  coursesService.getCoursesByMultipleSkill = async (skills) => {

    const courseBySkills = {};

    if(utils.checkLength(1,9999, skills)){
      return false
    }


    try {
      
      var courseDetails = await database.getCoursesByMultipleSkill(skills);
      courseBySkills.courseDetails = courseDetails;
      const courses = courseDetails.map(({ Course_ID }) => Course_ID);
      const coursesSkillsResult = await database.getCoursesSkills(courses);
      const courseSkills = coursesSkillsResult.map(
        ({ Skill_Name, Course_ID }) => {
          return { Skill_Name, Course_ID };
        }
      );

      for (let course of courseBySkills.courseDetails) {
        for (let skill of courseSkills) {
          if (skill.Course_ID == course.Course_ID) {
            if (courseDetails.skills) {
              if (!courseDetails.skills.includes(skill.Skill_Name)) {
                course.skills.push(skill.Skill_Name);
              }
            } else {
              course.skills = [skill.Skill_Name];
            }
          }
        }
      }
      
      return courseBySkills;
    } catch (err) {
      throw err;
    }
  };

  return coursesService;
}

module.exports = coursesService;
