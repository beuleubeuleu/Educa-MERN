import { Schema, model } from 'mongoose';

const categorieSchema = new Schema({
  titre: { type: String, required: true },
  imagePath: { type:String, required: true},
  imageAlt: { type:String, required:true},
});

// Create and export the model
const Categorie = model('Categorie', categorieSchema);

export default Categorie;