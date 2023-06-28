import {Outlet, Navigate} from "react-router-dom"
import { useUserContext } from "../../context/UserContext.tsx";
import { Loader }         from "../Loader/Loader.tsx";

export const AdminRoutes = () => {
  const {user, isLoading} = useUserContext()
  const validation = user && user.role == "admin"

  if(isLoading) {
    return <Loader/>
  }

  return validation? <Outlet/> : <Navigate to="/connexion"/>
};