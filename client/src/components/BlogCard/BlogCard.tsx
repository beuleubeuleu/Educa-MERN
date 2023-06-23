import { formatDate, slugify } from "../../ts/utils";
import { articleType }         from "../../types/articleType.ts";
import "./BlogCard.css"

type BlogCardProps = {
  article:articleType
}

export const BlogCard = ({article}: BlogCardProps) => {

  const {imagePath, imageAlt, categorie, titre, auteur, dateCreation} = article
  const url = `/article/${categorie._id}`

  return (
      <li className="blogcard__container">
        <a href={ url }>
          <img src={ imagePath } alt={ imageAlt } width="600" height="400"/>
        </a>
        <a className="blogcard__categorie" href={ `/categorie/${ slugify(categorie.titre) }` }>{ categorie.titre }</a>
        <div className="blogcard__texte">
          <h2>{ titre }</h2>

          <p>
            écrit par
            <a href={ `/auteur/${ slugify(auteur) }` }>{ auteur }</a>
            | { formatDate(dateCreation) }
          </p>
        </div>
        <a href={ url } className="blogcard__link--button"> Lire l'article</a>
      </li>
  );
};