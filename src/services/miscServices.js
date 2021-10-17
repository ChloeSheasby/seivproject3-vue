import apiClient from "@/services/services.js";

export default {

    /*getCourseItems(listId) {
      return apiClient.get("lists/" + listId + "/items");
    },
    addListItem(listId, item) {
      return apiClient.post("lists/" + listId + "/items", item);
    },
    updateListItem(listId, itemId, item) {
      return apiClient.put("lists/" + listId + "/items/" + itemId, item);
    },
    deleteListItem(listId, itemId) {
      return apiClient.delete("lists/" + listId + "/items/" + itemId);
    },
    getUser() {
      return apiClient.get("users");
    },
    addUser(user) {
      return apiClient.post("users", user);
    },
    loginUser(user) {
      return apiClient.post("users/login", user, {
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          "X-Requested-With": "XMLHttpRequest",
          crossDomain: true,
          Authorization: "Basic " + btoa(user.username + ":" + user.password)
        }
      });
    },
    logoutUser() {
      return apiClient.post("users/logout");
    }*/
  };