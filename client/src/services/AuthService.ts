import axios from "axios";
import { getObjectFromSessionStorage } from "../ts/utils.tsx";

//import { utilisateurType }                    from "../types/utilisateurType";

class AuthService {
  static async register(nom: string, prenom: string, email: string, password: string, role: string) {
    return axios.post("/api/utilisateur/register", {
      nom,
      prenom,
      email,
      password,
      role
    });
  }

  static async login(email: string, password: string) {
    return axios.post("/api/utilisateur/login", { email, password })
                .then(res => {
                  if ( res.data.token ) {
                    sessionStorage.setItem("token", JSON.stringify(res.data.token))
                  }
                  return res.data
                });
  }

  static logout() {
    sessionStorage.removeItem("token")
  }

  static getLoggedInUser() {
    return axios.get("/api/utilisateur/user-info", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
  }

}

export default AuthService