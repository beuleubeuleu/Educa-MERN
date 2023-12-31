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

  static async getAllByAuthor(idAuteur: string) {
    const response = await axios.get(`/api/article/auteur/${idAuteur}`, {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return response.data.articles
  }
  static async getMesArticles() {
    const response = await axios.get(`/api/article/auteur/mes-articles`, {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return response.data.articles
  }

  static async updateArticle(article: {
    titre: string,
    contenu: string,
    imageAlt?: string,
    estBrouillon: boolean,
    description?: string,
    categorie: string
  }, idArticle: string) {
    try {
      const response = await axios.put(`/api/article/update/${idArticle}`, article, {
        headers: {
          Authorization: "Bearer " + getObjectFromSessionStorage("token")
        }
      })
      return response.data.article
    } catch (error: any) {
      console.log(error)
    }
  }

  static async deleteArticle(idArticle: string) {
    const response = await axios.delete(`/api/article/delete/${idArticle}`, {
      headers: {
        Authorization: "Bearer " + getObjectFromSessionStorage("token")
      }
    })
    return response.data
  }

}

export default ArticleService