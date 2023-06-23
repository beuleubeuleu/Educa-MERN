import { Request, Response } from "express";
import Categorie             from "../models/categorie";

export const createCategory = async (req: Request, res: Response) => {
  try {
    const { titre } = req.body
    const categorie = await Categorie.create({
      titre,
      imagePath: req.file.path.split("/").slice(2).join("/"), // stock le chemin de l'image dans la db
      imageAlt: `Photo de base pour la catégorie: ${ titre }`
    });

    if ( !categorie ) {
      return res.status(500).json({ message: "La création de la catégorie à échoué" });
    }
    res.status(201).json(categorie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: error.message });
  }
}

export const deleteCategory = async (req: Request, res: Response) => {
//TODO: coder la fonction
}

export const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await Categorie.find();
    if (!categories){
      return res.status(500).json({ success:false, message: "La récupération des catégories à échoué" });
    }
    res.status(200).json({ success:true, categories });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success:false, message: error.message });
  }
}

export const getOneCategory = async (req: Request, res: Response) => {
//TODO: coder la fonction
}