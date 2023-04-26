import { createContext, useState } from "react";
import { http } from "../http/http";
import Product from "../types/Product";

type ProductType = {

    product: Product | undefined,
    products: Product[] | undefined,
    setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
    getProductThisCategory: (id: number) => void,
    deleteProduct: (id_product: number) => void,
}

export const ProductContext = createContext<ProductType>(null!);

export const ProductProvider = ({children}: {children: JSX.Element}) => {

    const [product, setProduct] = useState<Product | undefined>();
    const [products, setProducts] = useState<Product[] | undefined>([]);

    const getProductThisCategory = (id: number) => {

        http.get(`getProductThisCategory/${id}`).then((response) => {
            setProducts([...response.data]);
        })
    
    }

    const deleteProduct = (id_product: number) => {
        
        http.delete(`deleteProduct/${id_product}`).then((response) => {
            setProducts([...response.data]);
        });
    
    }

    return (

        <ProductContext.Provider value={{product, products, setProducts, getProductThisCategory, deleteProduct}}>
            {children}
        </ProductContext.Provider>

    );

}