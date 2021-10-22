import apiClient from "@/services/services.js";

export default {
  
    ///Student Courses CRUD commands
    getAllStudentCourses() {
      return apiClient.get("student_courses");
    },
    getStudentCourses(start, length) {
      return apiClient.get(`student_courses?start=${start}&length=${length}`);
    },
    getStudentCourse(id) {
      return apiClient.get("student_courses/" + id);
    },
    addStudentCourse(studentCourse) {
      return apiClient.post("student_courses", studentCourse);
    },
    updateStudentCourse(studentCourseId, studentCourse) {
      return apiClient.put("student_courses/" + studentCourseId, studentCourse);
    },
    deleteStudentCourse(studentCourseId) {
      return apiClient.delete("student_courses/" + studentCourseId);
    }
  };