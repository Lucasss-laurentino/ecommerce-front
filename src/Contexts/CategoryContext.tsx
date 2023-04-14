import { createContext, useState } from "react";
import { http } from "../http/http";
import Category from "../types/Category";
import SubCategory from "../types/SubCategory";

type CategoryType = {
    categories: Category[],
    category: Category | undefined,
    category_default: Category | undefined,
    createCategory: (category: any) => void,
    getCategories: () => void,
    getCategory: (id: number) => void, // string porque vem de um sessionStorage
    deleteCategory: (id: number) => void,
    categoryDefault: (id: number) => void,
    getCategoryDefault: () => void,

}

export const CategoryContext = createContext<CategoryType>(null!);

export const CategoryProvider = ({children}: {children: JSX.Element}) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [category_default, setCategory_default] = useState<Category>();
    const [category, setCategory] = useState<Category | undefined>();

    const createCategory = (category: any) => {

        http.request({
            url: 'createCategory',
            method: 'post',
            headers: {                
                'Content-type': 'multipart/form-data'
            },
            data: category
        }).then((response) => {
            getCategoryDefault();
            setCategories(response.data[1])
        })


    }

    const getCategories = () => {

        http.get('getCategories').then((response) => {
            setCategories(response.data);
        })
        
    }

    const getCategory = (id: number) => {
        http.get(`getCategory/${id}`).then((response) => {
            setCategory(response.data);
        })
    }

    const deleteCategory = (id: number) => {

        http.delete(`deleteCategory/${id}`).then((response) => {
            setCategories(response.data)
            getCategoryDefault();
        })


    }

    const categoryDefault = (id: number) => {

        http.get(`categoryDefault/${id}`).then((response) => {
            setCategories(response.data)
            getCategoryDefault()
        })

    }

    const getCategoryDefault = () => {

        http.get(`getCategoryDefault`).then((response) => {
            setCategory_default(response.data);
        })

    }

    return (
        <CategoryContext.Provider value={{category, categories, category_default, createCategory, getCategories, getCategory, deleteCategory, categoryDefault, getCategoryDefault }}>
            {children}
        </CategoryContext.Provider>
    )

}