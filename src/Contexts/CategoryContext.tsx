import { createContext } from "react";
import Category from "../types/Category";

type CategoryType = {
    categories: Category,
    getCategories: () => Promise<Category[]>,
}

export const CategoryContext = createContext<CategoryType>(null!);



export const CategoryProvider = () => {

    const getCategories = () => {
        
    }

}