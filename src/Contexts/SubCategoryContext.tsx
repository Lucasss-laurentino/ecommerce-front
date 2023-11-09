import { createContext, useState } from "react";
import { http } from "../http/http";
import SubCategory from "../types/SubCategory";

type SubCategoryType = {
    subCategories: SubCategory[] | undefined,
    getSubCategories: (category_id: string) => void,
    createSubCategory: (subCategoryName: string, category_id: string) => void,
    deleteSubCategory: (id: string) => void,
}

export const SubCategoryContext = createContext<SubCategoryType>(null!);

export const SubCategoryProvider = ({children}: {children: JSX.Element}) => {

    const [subCategories, setSubCategories] = useState<SubCategory[]>([]);

    const getSubCategories = (category_id: string) => {

        http.get(`getSubCategories/${category_id}`).then((response) => {
            setSubCategories([...response.data.subCategories]);
        })
    
    }

    const createSubCategory = (subCategoryName: string, category_id: string) => {

        http.post('createSubCategory', { subCategoryName, category_id }).then((response) => {
            setSubCategories([...response.data.subCategories]);
        })

    }

    const deleteSubCategory = (id: string) => {

        http.delete(`deleteSubCategory/${id}`).then((response) => {
            setSubCategories([...response.data.allSubCategories]);
        });
        
    }

    return (
        <SubCategoryContext.Provider value={{ subCategories, getSubCategories, createSubCategory, deleteSubCategory}}>
            {children}
        </SubCategoryContext.Provider>
    )

}