import axios                           from "axios";
import { getObjectFromSessionStorage } from "../ts/utils.tsx";

class ArticleService {

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

  static async getAllPublic() {
    const response = await axios.get("/api/article/public", {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return response.data.articles
  }

  static async getOneById(idArticle: string){
    const response = await axios.get(`/api/article/${idArticle}`, {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return response.data.article
  }

  static async getAllByCategory(idCategorie: string){
    const response = await axios.get(`/api/article/categorie/${idCategorie}`, {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return response.data.articles
  }

}

export default ArticleService