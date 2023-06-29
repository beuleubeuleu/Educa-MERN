import { useEffect, useState } from "react";
import { articleType }         from "../../../types/articleType.ts";
import { useParams }           from "react-router-dom";
import ArticleService          from "../../../services/ArticleService.ts";
import { BlogList }            from "../components/BlogList/BlogList.tsx";
import CategoriesService       from "../../../services/CategoriesService.ts";
import { Loader }              from "../../../components/Loader/Loader.tsx";

export const ArticleParCategorie = () => {
  const [data, setData] = useState<articleType[]>();
  const [categorie, setCategorie] = useState<any>();
  const { idCategorie } = useParams()

  const getData = async () => setData(await ArticleService.getAllByCategory(idCategorie!))
  const getCategorie = async () => setCategorie(await CategoriesService.getOne(idCategorie!))

  useEffect(() => {
    getData()
    getCategorie()
  }, [idCategorie]);

if (!data || !categorie) return <Loader/>
  return (
      <BlogList titre={"de "+ categorie.titre} data={data}/>
  );
};