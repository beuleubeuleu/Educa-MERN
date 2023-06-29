import {Request, Response} from "express";
import Article   from "../models/Article";
import Utilisateur         from "../models/Utilisateur";

export const getEleveCount = async (req: Request, res:Response)=>{
  try {
    const eleveCount = await Utilisateur.find({ role: "élève" }).count()
    if ( !eleveCount ) {
      return res.status(500).json({ success: false, message: "La récupération des élèves à échoué" });
    }
    res.status(200).json({ success: true, eleveCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getProfesseurCount = async (req: Request, res:Response)=>{
  try {
    const profCount = await Utilisateur.find({ role: "professeur" }).count()
    if ( !profCount ) {
      return res.status(500).json({ success: false, message: "La récupération des professeurs à échoué" });
    }
    res.status(200).json({ success: true, profCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getTotalUserCount = async (req: Request, res:Response)=>{
  try {
    const count = await Utilisateur.find().count()
    if ( !count ) {
      return res.status(500).json({ success: false, message: "La récupération des utilisateurs à échoué" });
    }
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getTotalArticleCount = async (req: Request, res:Response)=>{
  try {
    const count = await Article.find().count()
    const publicCount = await Article.find({estBrouillon: false}).count()
    if ( !count ) {
      return res.status(500).json({ success: false, message: "La récupération des articles à échoué" });
    }
    res.status(200).json({ success: true, count, publicCount });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const getPendingProfs = async (req: Request, res:Response)=>{
  try {
    const pendingProfs = await Utilisateur.find({statut: "en attente de confirmation"}, {"password":0})
    if ( !pendingProfs ) {
      return res.status(500).json({ success: false, message: "La récupération des profs à échoué" });
    }
    res.status(200).json({ success: true, pendingProfs });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}

export const validateProf = async (req: Request, res:Response)=>{
  try {
    const pendingProf = await Utilisateur.findById(req.params.idProf)
    if ( !pendingProf ) {
      return res.status(500).json({ success: false, message: "La récupération du prof à échoué" });
    }
    pendingProf.statut = "ok"
    pendingProf.save()
    if ( !pendingProf ) {
      return res.status(500).json({ success: false, message: "La mise à jour du prof à échoué" });
    }
    res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: error.message });
  }
}