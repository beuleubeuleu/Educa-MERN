import {Outlet, Navigate} from "react-router-dom"
import { useUserContext } from "../../context/UserContext.tsx";
import { Loader }         from "../Loader/Loader.tsx";

export const ProfRoutes = () => {
  const {user, isLoading} = useUserContext()
  const validation = user && user.role == "professeur"

  if(isLoading) {
    return <Loader/>
  }

  return validation? <Outlet/> : <Navigate to="/connexion"/>
};