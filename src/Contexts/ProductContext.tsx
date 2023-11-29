import { createContext, useState } from "react";
import { http } from "../http/http";
import Product from "../types/Product";

type ProductType = {

    product: Product | undefined,
    products: Product[] | undefined,
    setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
    getProductsThisCategory: (id_category: string) => void,
    deleteProduct: (id_product: string) => void,
    getProductsSubCategory: (subCategoryName: string) => void,
    productsThisSubCategory: Product[],

}

export const ProductContext = createContext<ProductType>(null!);

export const ProductProvider = ({children}: {children: JSX.Element}) => {

    const [product, setProduct] = useState<Product | undefined>();
    const [products, setProducts] = useState<Product[] | undefined>([]);

    const [productsThisSubCategory, setProductsThisSubCategory] = useState<Product[]>([]);

    const getProductsThisCategory = (id_category: string) => {

        http.get(`getProductsThisCategory/${id_category}`).then((response) => {
            setProducts([...response.data.products]);
        })
    
    }

    const deleteProduct = (id_product: string) => {
        
        http.delete(`deleteProduct/${id_product}`).then((response) => {
            setProducts([...response.data]);
        });
    
    }

    const getProductsSubCategory = (subCategoryName: string) => {

        http.get(`/getProductsSubCategory/${subCategoryName}`).then((response) => {
           
            setProductsThisSubCategory([...response.data.productsThisSubCategory]);

        })

    }

    return (

        <ProductContext.Provider value={{product, products, setProducts, getProductsThisCategory, deleteProduct, getProductsSubCategory, productsThisSubCategory}}>
            {children}
        </ProductContext.Provider>

    );

}