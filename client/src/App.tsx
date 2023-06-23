import "./App.css"
import { Header } from "./components/Header/Header.tsx";
import useFetch   from "./hooks/useFetch.ts";
import { articleType } from "./types/articleType.ts";
import { Loader } from "./components/Loader/Loader.tsx";
import { BlogCard } from "./components/BlogCard/BlogCard.tsx";

function App() {
  const { data, error, isLoading } = useFetch<{ articles: articleType[] }>("/api/article");
  console.log(data?.articles);

  return (
      <>
        <Header/>
        {isLoading && <Loader/>}
        {error && <p>what the heck</p>}
        {data && data.articles.map(article=> <BlogCard article={article} key={article._id}/>)}
      </>
  )
}

export default App
