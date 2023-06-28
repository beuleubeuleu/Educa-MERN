import {Outlet, Navigate} from "react-router-dom"
import { useUserContext } from "../../context/UserContext.tsx";
import { Loader }         from "../Loader/Loader.tsx";

export const PrivateRoutes = () => {
  const {user, isLoading} = useUserContext()

  if(isLoading) {
    return <Loader/>
  }

  return user? <Outlet/> : <Navigate to="/connexion"/>
};