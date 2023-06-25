import { model, Schema } from "mongoose";

const UtilisateurSchema = new Schema({
  nom: { type: String, required: true },
  prenom: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["admin", "élève", "professeur"], required: true },
  statut: { type: String, enum: ["ok", "en attente de confirmation"], required: true }
});

// Create and export the model
const Utilisateur = model("Utilisateur", UtilisateurSchema);

export default Utilisateur;