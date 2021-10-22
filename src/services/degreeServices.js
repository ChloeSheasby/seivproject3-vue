import apiClient from "@/services/services.js";

export default {

    ///Degrees CRUD commands
    getAllDegrees() {
      return apiClient.get("degrees");
    },
    getDegrees(start, length) {
      return apiClient.get(`degrees?start=${start}&length=${length}`);
    },
    getDegree(id) {
      return apiClient.get("degrees/" + id);
    },
    addDegree(degree) {
      return apiClient.post("degrees", degree);
    },
    updateDegree(degreeId, degree) {
      return apiClient.put("degrees/" + degreeId, degree);
    },
    deleteDegree(degreeId) {
      return apiClient.delete("degrees/" + degreeId);
    }
  };