// js/utils.js

const API_BASE = window.location.hostname === "localhost"
  ? "http://localhost:5000/api"
  : "https://queryhub-ht9p.onrender.com/api";


function getToken() {
  return localStorage.getItem("token");
}

function setToken(token) {
  localStorage.setItem("token", token);
}

function logout() {
  localStorage.removeItem("token");
  location.href = "login.html";
}
