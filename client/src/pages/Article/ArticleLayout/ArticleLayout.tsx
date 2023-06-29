import { Link, useParams }     from "react-router-dom";
import { formatDate }          from "../../../ts/utils.tsx";
import { articleType }         from "../../../types/articleType.ts";
import { useEffect, useState } from "react";
import ArticleService          from "../../../services/ArticleService.ts";
import { Loader }              from "../../../components/Loader/Loader.tsx";
import "./ArticleLayout.css"

export const ArticleLayout = () => {
  const [data, setData] = useState<articleType>();
  const { idArticle } = useParams()

  const getData = async () => setData(await ArticleService.getOneById(idArticle!))
  useEffect(() => {
    getData()
  }, []);



  return (
      <>
        { !data && <Loader/> }
        { data && <article className="article-layout__container">
          <div className="article-layout__hero">
            <Link className="article-layout__hero--categorie"
                  to={ `/article/categorie/${ data.categorie._id }` }>{ data.categorie.titre }</Link>
            <h2>{ data.titre }</h2>
            <p>
              écrit par•
              <Link to={ `/article/auteur/${ data.auteur._id }` }>{ data.auteur.nomComplet }</Link>
              { " " }| { formatDate(data.dateCreation) }
            </p>
            <div className="article-layout__hero--image">
              <img src={ `/${ data.imagePath }` } alt={ data.imageAlt } width="600" height="400"/>
            </div>
          </div>
            <div className="article-layout__texte">
              { data.contenu }
            </div>
        </article> }
      </>
  );
};