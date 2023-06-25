import "./App.css"
import { Header } from "./components/Header/Header.tsx";
import { BlogList } from "./components/BlogList/BlogList.tsx";
import { Login } from "./components/Auth/Login.tsx";

function App() {
  return (
      <>
        <Header/>
        <Login/>
        <BlogList/>
      </>
  )
}

export default App
