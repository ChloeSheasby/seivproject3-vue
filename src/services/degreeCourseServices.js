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
    addDegreeCourse(degree) {
      return apiClient.post("degree_courses", degree);
    },
    updateDegreeCourse(degreeId, degree) {
      return apiClient.put("degree_courses/" + degreeId, degree);
    },
    deleteDegreeCourse(degreeId) {
      return apiClient.delete("degree_courses/" + degreeId);
    }
  };