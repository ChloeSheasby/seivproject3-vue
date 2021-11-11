import apiClient from "@/services/services.js";

export default {

    ///Degree Courses CRUD commands
    getAllDegreeCourses() {
      return apiClient.get("degree_courses");
    },
    getAllForDegree(id) {
      return apiClient.get("degree_courses/degree/" + id);
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
    deleteDegreeCourse(degreeCourseID) {
      return apiClient.delete("degree_courses/" + degreeCourseID);
    }
  };