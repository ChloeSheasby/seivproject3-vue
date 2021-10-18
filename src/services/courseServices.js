import apiClient from "@/services/services.js";

export default {

    ///Courses CRUD commands
    getAllCourses() {
      return apiClient.get("courses");
    },
    getCourses(start, length) {
      return apiClient.get(`courses?start=${start}&length=${length}`);
    },
    getCourse(id) {
      return apiClient.get("courses/" + id);
    },
    addCourse(course) {
      return apiClient.post("courses", course);
    },
    updateCourse(courseId, course) {
      return apiClient.put("courses/" + courseId, course);
    },
    deleteCourse(courseId) {
      return apiClient.delete("courses/" + courseId);
    }
  };