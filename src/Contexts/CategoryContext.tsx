import { createContext, useState } from "react";
import { http } from "../http/http";
import Category from "../types/Category";

type CategoryType = {
    categories: Category[],
    createCategory: (category: any) => void,
    getCategories: () => void,
}

export const CategoryContext = createContext<CategoryType>(null!);

export const CategoryProvider = ({children}: {children: JSX.Element}) => {

    const [categories, setCategories] = useState<Category[]>([]);

    const createCategory = (category: any) => {

        http.request({
            url: 'createCategory',
            method: 'post',
            headers: {                
                'Content-type': 'multipart/form-data'
            },
            data: category
        }).then((response) => {
            setCategories(response.data[1])
        })


    }

    const getCategories = () => {

        http.get('getCategories').then((response) => {
            setCategories(response.data);
        })
        
    }

    return (
        <CategoryContext.Provider value={{ categories, createCategory, getCategories }}>
            {children}
        </CategoryContext.Provider>
    )

}