import { createContext, useState } from "react";
import Product from "../types/Product";

type ProductType = {

    product: Product | undefined,
    products: Product[] | undefined,
    setProducts: React.Dispatch<React.SetStateAction<Product[] | undefined>>,
}

export const ProductContext = createContext<ProductType>(null!);

export const ProductProvider = ({children}: {children: JSX.Element}) => {

    const [product, setProduct] = useState<Product | undefined>();
    const [products, setProducts] = useState<Product[] | undefined>([]);

    return (

        <ProductContext.Provider value={{product, products, setProducts}}>
            {children}
        </ProductContext.Provider>

    );

}