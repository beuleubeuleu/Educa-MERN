import { useEffect, useState } from "react";
import { articleType }         from "../../types/articleType.ts";
import { useParams }           from "react-router-dom";
import ArticleService          from "../../services/ArticleService.ts";
import { BlogList }            from "../Article/components/BlogList/BlogList.tsx";
import CategoriesService       from "../../services/CategoriesService.ts";

export const ArticleParCategorie = () => {
  const [data, setData] = useState<articleType>();
  const [categorie, setCategorie] = useState();
  const { idCategorie } = useParams()

  const getData = async () => setData(await ArticleService.getAllByCategory(idCategorie!))
  const getCategorie = async () => setCategorie(await CategoriesService.getOne(idCategorie!))

  useEffect(() => {
    getData()
    getCategorie()
  }, [idCategorie]);


  return (
      <BlogList titre={"de "+ categorie?.titre} data={data}/>
  );
};