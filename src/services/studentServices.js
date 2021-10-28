import apiClient from "@/services/services.js";

export default {

    ///Students CRUD commands
    getAllStudents() {
      return apiClient.get("students");
    },
    getStudents(start, length) {
      return apiClient.get(`students?start=${start}&length=${length}`);
    },
    getStudentsForAdvisor(id) {
      return apiClient.get(`students/advisor/`+ id);
    },
    getStudent(id) {
      return apiClient.get("students/" + id);
    },
    addStudent(student) {
      return apiClient.post("students", student);
    },
    updateStudent(studentId, student) {
      return apiClient.put("students/" + studentId, student);
    },
    deleteStudent(studentId) {
      return apiClient.delete("students/" + studentId);
    }
  };