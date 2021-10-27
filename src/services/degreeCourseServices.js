import apiClient from "@/services/services.js";

export default {

    ///Degree Courses CRUD commands
    getAllDegreeCourses() {
      return apiClient.get("degree_courses");
    },
    getDegreeCourses(start, length) {
      return apiClient.get(`degree_courses?start=${start}&length=${length}`);
    },
    getDegreeCourse(id) {
      return apiClient.get("degree_courses/" + id);
    },
    addDegreeCourse(degree_courses) {
      return apiClient.post("degree_courses", degree_courses);
    },
    updateDegreeCourse(degreeCourseID, degree_courses) {
      return apiClient.put("degree_courses/" + degreeCourseID, degree_courses);
    },
    deleteDegreeCourse(degreeId) {
      return apiClient.delete("degree_courses/" + degreeId);
    }
  };