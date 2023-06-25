import { Request, Response } from "express";
import Utilisateur           from "../models/Utilisateur";
import bcrypt                from "bcryptjs"
import jwt from "jsonwebtoken"

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { nom, prenom, email, password, role } = req.body;

    const existingUser = await Utilisateur.findOne({ email });
    if ( existingUser ) {
      return res.status(201).json({ message: "Cette adresse email est déjà utilisée" });
    }

    const salt = await bcrypt.genSalt(10);
    const passwordHash = await bcrypt.hash(password, salt);

    if ( role === "admin" ) {
      return res.status(401).json({ message: "L'inscription d'administrateur est interdite" });
    }

    const statut = role === "élève"? "ok": "en attente de confirmation"

    const user = new Utilisateur({
      nom,
      prenom,
      nomComplet: `${prenom} ${nom}`,
      password: passwordHash,
      email,
      role,
      statut
    });

    const newUser = await user.save();

    res.status(201).json({ message: "Utilisateur créé avec succès" });
  } catch (error) {
    console.error(error.errors);
    if ( error.errors.role.properties.type == "enum" ) {
      return res.status(400).json({ message: "Mauvais paramètres" })
    }
    res.status(500).json({ message: "Internal server error" });
  }
}

export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body
    if(!email || !password) {
      return res.status(400).json({message: "l'email et le mot de passe sont nécessaires "})
    }

    const utilisateur = await Utilisateur.findOne({ email })
    if ( !utilisateur ) {
      return res.status(400).json({ message: "email ou mot de pass incorrect" })
    }

    const isPasswordMatch = await bcrypt.compare(password, utilisateur.password)
    if ( !isPasswordMatch ) {
      return res.status(400).json({ message: "email ou mot de pass incorrect" })
    }

    const token = jwt.sign(
        { id: utilisateur._id },
        process.env.JWT_SECRET, { expiresIn: "1h" }
    )
    res.status(200).json({utilisateur: utilisateur.email, token })
}

export const updateUser = async (req: Request, res: Response) => {

}

export const deleteUser = async (req: Request, res: Response) => {

}

export const getAllUsers = async (req: Request, res: Response) => {

}

export const getUserById = async (req: Request, res: Response) => {

}

export const getUserCount = async (req: Request, res: Response) => {

}
