export type articleType = {
titre: string,
  _id:string
  contenu: string,
  auteur: string,
  dateCreation: Date,
  estBrouillon: boolean,
  imagePath: string,
  imageAlt: string,
  description: string,
  categorie:{titre:string, _id:string}
}