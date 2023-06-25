import { NextFunction, Request, Response } from "express";
import jwt                                 from "jsonwebtoken"
import Utilisateur                         from "../../models/Utilisateur";


export const estConnecté = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const token = req.headers["authorization"].split(" ")[1];
    if ( !token ) {
      return res.status(401).json({ message: "Token manquant." });
    }
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET)
    req.user = await Utilisateur.findById(decodedToken.id)
    next();
  } catch (error) {
    return res.status(401).send({ message: "L'authentification a échoué" });
  }
};