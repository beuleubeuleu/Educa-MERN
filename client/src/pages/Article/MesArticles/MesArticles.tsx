import { useEffect, useState } from "react";
import { articleType }         from "../../../types/articleType.ts";
import ArticleService          from "../../../services/ArticleService.ts";
import { Loader }              from "../../../components/Loader/Loader.tsx";
import { MonArticleCard }      from "./MonArticleCard.tsx";

export const MesArticles = () => {
  const [data, setData] = useState<articleType[]>();

  const getData = async () => setData(await ArticleService.getMesArticles())

  useEffect(() => {
    getData()
  }, []);

  if ( !data ) return <Loader/>
  return (
      <>
        <h2 className="card__titre"> Tous vos articles:</h2>
        <ul className="card__liste">
          { !data && <Loader/> }
          { data && data.map(article => <MonArticleCard article={ article } key={ article._id }/>) }
        </ul>
      </>
  );
};