import { createContext, useEffect, useState } from "react";
import { http } from "../http/http";
import Category from "../types/Category";

type CategoryType = {
    categories: Category[],
    category: Category | undefined,
    category_default: Category | undefined,
    createCategory: (category: any) => void,
    getCategories: () => void,
    getCategory: (id: string) => void,
    deleteCategory: (id: string) => void,
    categoryDefault: (id: string) => void,
    getCategoryDefault: () => void,

}

export const CategoryContext = createContext<CategoryType>(null!);

export const CategoryProvider = ({children}: {children: JSX.Element}) => {

    const [categories, setCategories] = useState<Category[]>([]);
    const [category_default, setCategory_default] = useState<Category>();
    const [category, setCategory] = useState<Category | undefined>();

    const createCategory = (category: any) => {

        http.request({
            url: '/createCategory',
            method: 'post',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: category
        }).then((response) => {
            setCategories([...categories, response.data.category]);
            getCategoryDefault();

        })
        

    }

    const getCategories = () => {

        http.get('getCategories').then((response) => {
            setCategories([...response.data.categories]);
        })
        
    }

    const getCategory = (id: string) => {

        http.get(`/getCategory/${id}`).then((response) => {
            setCategory(response.data.category[0]);
        })

    }

    const deleteCategory = (id: string) => {

        http.delete(`deleteCategory/${id}`).then((response) => {
            setCategories([...response.data.allCategories]);
            getCategoryDefault();
        })


    }

    const categoryDefault = (id: string) => {

        http.post(`/categoryDefault`, {id}).then((response) => {
            setCategories([...response.data.categories]);
            getCategoryDefault();
        })

    }

    const getCategoryDefault = () => {

        http.get(`/getCategoryDefault`).then((response) => {
            setCategory_default(response.data.categoryDefault);
        })

    }

    return (
        <CategoryContext.Provider value={{category, categories, category_default, createCategory, getCategories, getCategory, deleteCategory, categoryDefault, getCategoryDefault }}>
            {children}
        </CategoryContext.Provider>
    )

}