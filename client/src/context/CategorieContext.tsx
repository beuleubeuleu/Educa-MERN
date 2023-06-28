import React, { createContext, useContext, useEffect, useState } from "react";
import CategoriesService                                         from "../services/CategoriesService.ts";
import { useUserContext }                                        from "./UserContext.tsx";

type contextProps = {
  children: React.ReactNode
}

type UserContextType = {
  catégories: any[]
}

const CategorieContext = createContext<UserContextType>({
  catégories: []
});

export const useCategorieContext = () => useContext(CategorieContext)

const CategorieProvider = ({ children }: contextProps) => {
const {user} = useUserContext()
  const [catégories, setCatégories] = useState<any[]>([]);

  async function getAllCategories(): Promise<any> {
    try {
      const réponse = await CategoriesService.getAll();
      setCatégories(réponse);
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    getAllCategories()
  }, [user]);

  return (
      <CategorieContext.Provider value={ { catégories } }>
        { children }
      </CategorieContext.Provider>
  );
};

export default CategorieProvider;