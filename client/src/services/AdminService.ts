import axios                           from "axios";
import { getObjectFromSessionStorage } from "../ts/utils.tsx";

class AdminService {
  static async getEleveCount() {
    const réponse = await axios.get("/api/admin/eleve/count", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return réponse.data.eleveCount
  }
  static async getProfCount() {
    const réponse = await axios.get("/api/admin/professeur/count", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return réponse.data.profCount
  }
  static async getUserCount() {
    const réponse = await axios.get("/api/admin/user/count", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return réponse.data.count
  }
  static async getArticleCount() {
    const réponse = await axios.get("/api/admin/article/count", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })

    const data= {count: réponse.data.count, publicCount: réponse.data.publicCount}

    return data
  }
  static async getPendingProfs() {
    const réponse = await axios.get("/api/admin/professeur",{
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return réponse.data.pendingProfs
  }
  static async validateProf(idProf:string) {
    const réponse = await axios.post(`/api/admin/professeur/validate/${idProf}`,{},{
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return réponse.data
  }
}

export default AdminService