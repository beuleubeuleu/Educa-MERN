import { Request, Response } from "express";
import Categorie             from "../models/categorie";
import Article               from "../models/Article";


export const createArticle = async (req: Request, res: Response) => {
  try {
    const { titre, contenu, imageAlt, description } = req.body
    let {estBrouillon} = req.body
    if ( req.file && !imageAlt ) {
      res.status(400).send({
        success: false,
        message: "Une description pour la photo fournie est nécessaire pour nos élèves malvoyants."
      })
    }


    const categorie = await Categorie.findById(req.body.categorie)
    const imagePath = req.file?req.file.path.split("/").slice(2).join("/"): categorie.imagePath

    if (req.user.statut != "ok") {
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
      description: description || contenu.substring(0,69)+"..."
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
  //TODO: coder la fonction
}

export const getAllArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find().populate("categorie", "titre").populate("auteur", "nomComplet");
    if (!articles){
      return res.status(500).json({ success:false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success:true, articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: error.message });
  }
}

export const getAllPublicArticles = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({estBrouillon:false}).populate("categorie", "titre").populate("auteur", "nomComplet");
    if (!articles){
      return res.status(500).json({ success:false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success:true, articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: error.message });
  }
}

export const getOneArticle = async (req: Request, res: Response) => {
  try {
    const article = await Article.findById(req.params.idArticle).populate("categorie", "titre").populate("auteur", "nomComplet");
    if (!article){
      return res.status(500).json({ success:false, message: "La récupération de l'article à échoué" });
    }
    res.status(200).json({ success:true, article });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: error.message });
  }
}
export const getAllArticleByCategorie = async (req: Request, res: Response) => {
  try {
    const articles = await Article.find({categorie: req.params.idCategorie, estBrouillon: false}).populate("categorie", "titre").populate("auteur", "nomComplet");
    if (!articles){
      return res.status(500).json({ success:false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success:true, articles: articles });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: error.message });
  }
}

export const updateArticle = async (req: Request, res: Response) => {
  //TODO: coder la fonction
}