import { Schema, model } from 'mongoose';

const ArticleSchema = new Schema({
  titre: { type: String, required: true },
  auteur: { type: Schema.Types.ObjectId, ref:"Utilisateur", required: true },
  contenu: { type: String, required: true },
  dateCreation: {type:Date,required:true},
  estBrouillon: {type:Boolean,required:true},
  categorie:{type: Schema.Types.ObjectId, ref:"Categorie", required:true},
  imagePath: { type:String},
  imageAlt: { type:String},
  description: {type:String, maxLength: 72}
});

// Create and export the model
const Article = model('Article', ArticleSchema);

export default Article;