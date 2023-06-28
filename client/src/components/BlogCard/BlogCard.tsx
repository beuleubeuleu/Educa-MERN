import { formatDate, slugify } from "../../ts/utils";
import { articleType }         from "../../types/articleType.ts";
import "./BlogCard.css"
import { Link }                from "react-router-dom";

type BlogCardProps = {
  article:articleType
}

export const BlogCard = ({article}: BlogCardProps) => {

  const {imagePath, imageAlt, categorie, titre, auteur, dateCreation} = article
  const url = `/article/${article._id}`

  return (
      <li className="blogcard__container">
        <Link to={ url }>
          <img src={ imagePath } alt={ imageAlt } width="600" height="400"/>
        </Link>
        <Link className="blogcard__categorie" to={ `/article/categorie/${ slugify(categorie.titre) }` }>{ categorie.titre }</Link>
        <div className="blogcard__texte">
          <h2>{ titre }</h2>

          <p>
            écrit par•
            <Link to={ `/auteur/${ slugify(auteur.nomComplet) }` }>{ auteur.nomComplet }</Link>
            {" "}| { formatDate(dateCreation) }
          </p>
        </div>
        <Link to={ url } className="blogcard__link--button"> Lire l'article</Link>
      </li>
  );
};