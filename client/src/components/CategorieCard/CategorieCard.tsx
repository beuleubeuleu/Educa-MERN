import "./CategorieCard.css"
import { Link }            from "react-router-dom";
import { ImageWithLoader } from "../ImageWithLoader.tsx";

type CategorieCardProps = {
  catégorie: any
}

export const CategorieCard = ({ catégorie }: CategorieCardProps) => {

  const { imagePath, imageAlt, titre } = catégorie
  const url = `/categorie/${ catégorie._id }`

  return (
      <li className="categorieCard__container">
        <Link to={ url }>
          <ImageWithLoader imagePath={ imagePath } imageAlt={ imageAlt } width="600" height="400"/>
        </Link>
        <div className="categorieCard__texte">
          <h2>{ titre }</h2>
        </div>
        <Link to={ url } className="categorieCard__link--button"> Voir les articles</Link>
      </li>
  );
};