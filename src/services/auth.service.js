import axios from "axios";

const API_URL = "http://10.15.250.6:8092/api/auth/";

class AuthService {
  login(username, password) {
    return axios
      .post(API_URL + "signin", { username, password })
      .then((response) => {
        if (response.data.accessToken) {
          localStorage.setItem("user", JSON.stringify(response.data));
        }
        return response.data;
      });
  }

  logout() {
    localStorage.removeItem("user");
  }

  register(username, email, password, nom) {
    return axios.post(API_URL + "signup", {
      username,
      email,
      password,
      nom
    });
  }
}

export default new AuthService();
