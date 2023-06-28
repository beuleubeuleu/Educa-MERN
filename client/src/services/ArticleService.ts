import axios                           from "axios";
import { getObjectFromSessionStorage } from "../ts/utils.tsx";

class ArticleService {
  static async getAll() {
    const response = await axios.get("/api/article", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return response.data.categories
  }

  static async createArticle(article: {
    titre: string,
    contenu: string,
    imageAlt?: string,
    estBrouillon: boolean,
    description?: string,
    categorie: string
  }) {
    try {
      const response = await axios.post("/api/article", article, {
        headers: {
          Authorization: "Bearer " + getObjectFromSessionStorage("token")
        }
      })
      return response.data
    } catch (error: any) {
      return error.message
    }
  }


}

export default ArticleService