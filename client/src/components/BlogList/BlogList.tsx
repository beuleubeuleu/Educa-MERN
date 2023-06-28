import { Loader }   from "../Loader/Loader.tsx";
import { BlogCard } from "../BlogCard/BlogCard.tsx";
import "../../style/CardList.css"
import { useUserContext } from "../../context/UserContext.tsx";
import ArticleService from "../../services/ArticleService.ts";
import { articleType }         from "../../types/articleType.ts";
import { useEffect, useState } from "react";

export const BlogList = () => {
  const {user} = useUserContext()

  const [data, setData] = useState<articleType[]>([]);
  const getData=async() => setData(await ArticleService.getAllPublic())
  useEffect(() => {
    getData()
  }, []);

  return (
      <>
        <h2 className="card__titre"> salut {user?.nomComplet} Tous les articles:</h2>
        <ul className="card__liste">
          { !data && <Loader/> }
          { data && data.map(article => <BlogCard article={ article } key={ article._id }/>) }
        </ul>
      </>
  );
};