import { useEffect, useState } from "react";
import { articleType }         from "../../../types/articleType.ts";
import { useParams }           from "react-router-dom";
import ArticleService          from "../../../services/ArticleService.ts";
import { BlogList }            from "../components/BlogList/BlogList.tsx";
import { Loader }              from "../../../components/Loader/Loader.tsx";

export const ArticleParAuteur = () => {
  const [data, setData] = useState<articleType[]>();
  const { idAuteur } = useParams()

  const getData = async () => setData(await ArticleService.getAllByAuthor(idAuteur!))

  useEffect(() => {
    getData()
  }, [idAuteur]);

  if (!data) return <Loader/>
  return (
      <BlogList titre={"de "+ data[0].auteur.nomComplet} data={data}/>
  );
};