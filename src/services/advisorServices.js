import apiClient from "@/services/services.js";

export default {
  
    ///Advisors CRUD commands
    getAllAdvisors() {
      return apiClient.get("advisors");
    },
    getAdvisors(start, length) {
      return apiClient.get(`advisors?start=${start}&length=${length}`);
    },
    getAdvisor(id) {
      return apiClient.get("advisors/" + id);
    },
    addAdvisor(advisor) {
      return apiClient.post("advisors", advisor);
    },
    updateAdvisor(advisorId, advisor) {
      return apiClient.put("advisors/" + advisorId, advisor);
    },
    deleteAdvisor(advisorId) {
      return apiClient.delete("advisors/" + advisorId);
    }
  };