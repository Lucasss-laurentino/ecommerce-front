import { createContext, useState } from "react";
import { http } from "../http/http";
import SubCategory from "../types/SubCategory";

type SubCategoryType = {
    subCategories: SubCategory[] | undefined,
    getSubCategories: (id: number) => void,
    createSubCategory: (subCategoryName: string, category_id: number) => void,
    deleteSubCategory: (id: number) => void,
}

export const SubCategoryContext = createContext<SubCategoryType>(null!);

export const SubCategoryProvider = ({children}: {children: JSX.Element}) => {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    const getSubCategories = (id: number) => {

        http.get(`getSubCategories/${id}`).then((response) => {
            setSubCategories(response.data);
        })

    }

    const createSubCategory = (subCategoryName: string, category_id: number) => {
        http.post('createSubCategory', { subCategoryName, category_id }).then((response) => {
            setSubCategories(response.data)
        })
    }

    const deleteSubCategory = (id: number) => {
        http.delete(`deleteSubCategory/${id}`).then((response) => {
            setSubCategories(response.data);
        })
    }

    return (
        <SubCategoryContext.Provider value={{ subCategories, getSubCategories, createSubCategory, deleteSubCategory }}>
            {children}
        </SubCategoryContext.Provider>
    )

}