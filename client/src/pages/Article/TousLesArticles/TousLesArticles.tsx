import { useEffect, useState } from "react";
import { articleType }         from "../../../types/articleType.ts";
import ArticleService from "../../../services/ArticleService.ts";
import { BlogList }   from "../components/BlogList/BlogList.tsx";

export const TousLesArticles = () => {
  const [data, setData] = useState<articleType[]>([]);
  const getData=async() => setData(await ArticleService.getAllPublic())
  useEffect(() => {
    getData()
  }, []);
  return (
      <BlogList titre={"publiques"} data={data}/>
  );
};