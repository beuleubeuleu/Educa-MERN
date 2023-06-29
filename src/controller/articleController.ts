import { Request, Response } from "express";
import Categorie             from "../models/categorie";
import Article               from "../models/Article";
import { deleteFile }        from "../utils/deleteFile";


export const createArticle = async (req: Request, res: Response) => {
  try {
    const { titre, contenu, imageAlt, description } = req.body
    let { estBrouillon } = req.body
    if ( req.file && !imageAlt ) {
      res.status(400).send({
        success: false,
        message: "Une description pour la photo fournie est nécessaire pour nos élèves malvoyants."
      })
    }


    const categorie = await Categorie.findById(req.body.categorie)
    const imagePath = req.file? req.file.path.split("/").slice(2).join("/"): categorie.imagePath

    if ( req.user.statut != "ok" ) {
      estBrouillon = true
    }

    const nouvelArticle = {
      titre,
      auteur: req.user._id,
      contenu,
      dateCreation: Date.now(),
      estBrouillon,
      categorie: categorie._id,
      imagePath,
      imageAlt: req.file? imageAlt: categorie.imageAlt,
      description: description || contenu.substring(0, 69) + "..."
    }
    const article = await Article.create(nouvelArticle);

    if ( !article ) {
      return res.status(500).json({
        success: false,
        message: "La création de l'article à échoué"
      });
    }
    res.status(201).json({
      success: true,
      article
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const deleteArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.idArticle);
    if (req.user._id.toString() != article.auteur.toString()) {
      return res.status(403).json({ message: "Interdit de supprimer les articles que vous n'avez pas créé"});
    }

    const deletedArticle = await Article.findByIdAndDelete(req.params.idArticle);
    if ( !deletedArticle ) {
      return res.status(404).json({ message: "Article introuvable" });
    }
    res.status(200).json({ message: "Article supprimé avec succès" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "la suppression a echoué" });
  }
}

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find().populate("categorie", "titre").populate("auteur", "nomComplet");
    if ( !articles ) {
      return res.status(500).json({ success: false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getAllPublicArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({ estBrouillon: false }).populate("categorie", "titre")
                                  .populate("auteur", "nomComplet");
    if ( !articles ) {
      return res.status(500).json({ success: false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success: true, articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getOneArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.idArticle).populate("categorie", "titre")
                                 .populate("auteur", "nomComplet");
    if ( !article ) {
      return res.status(500).json({ success: false, message: "La récupération de l'article à échoué" });
    }
    res.status(200).json({ success: true, article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
export const getAllArticleByCategorie = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({ categorie: req.params.idCategorie, estBrouillon: false })
                                  .populate("categorie", "titre").populate("auteur", "nomComplet");
    if ( !articles ) {
      return res.status(500).json({ success: false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success: true, articles: articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
export const getAllArticleByAuthor = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({ auteur: req.params.idAuteur, estBrouillon: false })
                                  .populate("categorie", "titre").populate("auteur", "nomComplet");
    if ( !articles ) {
      return res.status(500).json({ success: false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success: true, articles: articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}
export const getMesArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({ auteur: req.user.id }).populate("categorie", "titre")
                                  .populate("auteur", "nomComplet");
    if ( !articles ) {
      return res.status(500).json({ success: false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success: true, articles: articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const updateArticle = async (req: Request, res: Response) => {
  try {

    const article = await Article.findById(req.params.idArticle);
    if (req.user._id.toString() != article.auteur._id.toString()) {
      return res.status(403).json({ message: "Interdit de modifier les articles que vous n'avez pas créé"});
    }

    if ( !article ) {
      return res.status(404).json({ message: "Article non trouvé" });
    }

    const { titre, contenu, imageAlt, description, categorie } = req.body
    let { estBrouillon } = req.body

    if ( req.file && !imageAlt ) {
      res.status(400).send({
        success: false,
        message: "Une description pour la photo fournie est nécessaire pour nos élèves malvoyants."
      })
    }

    // If request has an image file, use multer for file upload
    if ( req.file ) {
      // Delete previous image if it exists
      await deleteFile(article.imagePath);
    }
    const dbCategorie = await Categorie.findById(categorie)
    const imagePath = req.file? req.file.path.split("/").slice(2).join("/"): dbCategorie.imagePath

    if ( req.user.statut != "ok" ) {
      estBrouillon = true
    }

      article.titre = titre,
      article.contenu = contenu,
      article.estBrouillon = estBrouillon,
      article.categorie = categorie,
      article.imagePath = imagePath,
      article.imageAlt = req.file? imageAlt: dbCategorie.imageAlt,
      article.description = description || contenu.substring(0, 69) + "..."

    await article.save();

    if ( !article ) {
      return res.status(500).json({
        success: false,
        message: "La mise à jour de l'article à échoué"
      });
    }
    res.status(201).json({
      success: true,
      article
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}