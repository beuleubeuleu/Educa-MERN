import { Link }            from "react-router-dom";
import { ImageWithLoader } from "../../../components/ImageWithLoader.tsx";
import { formatDate }      from "../../../ts/utils.tsx";
import { articleType }     from "../../../types/articleType.ts";

type MonArticleCardProps = {
  article: articleType
}

export const MonArticleCard = ({article}: MonArticleCardProps) => {

  const {imagePath, imageAlt, categorie, titre, auteur, dateCreation, estBrouillon} = article
  const url = `/article/modifier/${article._id}`

  return (
      <>
        <li className="blogcard__container">
          <Link to={ url }>
            <ImageWithLoader imagePath={ `/${imagePath}` } imageAlt={ imageAlt } width="600" height="400"/>
          </Link>
          <Link className="blogcard__categorie" to={ `/article/categorie/${ categorie._id }` }>{ categorie.titre }</Link>
          {estBrouillon && <div className="blogcard__estBrouillon">Brouillon</div> }
          <div className="blogcard__texte">
            <h2>{ titre }</h2>

            <p>
              écrit par•
              <Link to={ `/article/auteur/${ auteur._id }` }>{ auteur.nomComplet }</Link>
              {" "}| { formatDate(dateCreation) }
            </p>
          </div>
          <Link to={ url } className="blogcard__link--button">Modifier l'article</Link>
        </li></>
  );
};