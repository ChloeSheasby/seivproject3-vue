import apiClient from "@/services/services.js";

export default {

    ///Semesters CRUD commands
    getAllSemesters() {
      return apiClient.get("semesters");
    },
    getSemesters(start, length) {
      return apiClient.get(`semesters?start=${start}&length=${length}`);
    },
    getSemester(id) {
      return apiClient.get("semesters/" + id);
    },
    addSemester(semester) {
      return apiClient.post("semesters", semester);
    },
    updateSemester(semesterId, semester) {
      return apiClient.put("semesters/" + semesterId, semester);
    },
    deleteSemester(semesterId) {
      return apiClient.delete("semesters/" + semesterId);
    }
  };