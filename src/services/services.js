import axios from "axios";

var baseurl = "";
if (process.env.NODE_ENV === "development") {
  baseurl = "http://localhost/api/";
} else {
  baseurl = "/api/";
}

const apiClient = axios.create({
  baseURL: baseurl,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    "X-Requested-With": "XMLHttpRequest",
    "Access-Control-Allow-Origin": "*",
    crossDomain: true
  }/*,
  transformRequest: (data, headers) => {
    let token = localStorage.getItem("token");
    let authHeader = "";
    if (token != null && token != "") authHeader = "Bearer " + token;
    headers.common["Authorization"] = authHeader;
    return JSON.stringify(data);
  }*/,
  transformResponse: function(data) {
    data = JSON.parse(data);
    if (!data.success && data.code == "expired-session") {
      localStorage.deleteItem("token");
    }
    return data;
  }
});

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
  },

  ///Students CRUD commands
  getAllStudents() {
    return apiClient.get("students");
  },
  getStudents(start, length) {
    return apiClient.get(`students?start=${start}&length=${length}`);
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
  },

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
  },

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
  },

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
  },

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
  },

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
  },

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