import axios                           from "axios";
import { getObjectFromSessionStorage } from "../ts/utils.tsx";

class CategoriesService {
  static async getAll() {
    const réponse = await axios.get("/api/categorie", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return réponse.data.categories
  }

  static async getOne(idCategorie: string) {
    const réponse = await axios.get(`/api/categorie/${idCategorie}`, {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return réponse.data.categorie
  }
}

export default CategoriesService