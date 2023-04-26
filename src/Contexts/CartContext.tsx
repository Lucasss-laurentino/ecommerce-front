import { createContext, useState } from "react";
import { http } from "../http/http";
import Product from "../types/Product";

type CartType = {

    total: number,
    productsThisUser: Product[][],
    productsSelected: Product[] | undefined,
    selectProduct: (product: Product) => void,
    getProductsThisUser: () => void,

}

export const CartContext = createContext<CartType>(null!);

export const CartProvider = ({children}: {children: JSX.Element}) => {

    const [productsThisUser, setProductsThisUser] = useState<Product[][]>([]);

    const [productsSelected, setProductsSelected] = useState<Product[]>([]);

    const [total, setTotal] = useState<number>(0);

    const selectProduct = (product: Product) => {

        const element = document.getElementById(product.name);

        if(element?.getAttribute('checked')){

            element.removeAttribute('checked');

            productsSelected.map((productSelected, index) => {

                if(productSelected.id === product.id){

                    productsSelected.splice(index, 1);

                    setTotal(total - Number(productSelected.price));

                }

            })
                        
        } else {

            element?.setAttribute('checked', 'checked')

            setProductsSelected([...productsSelected, product]);

            setTotal(total + Number(product.price));
            
        }


    }

    const getProductsThisUser = () => {

        const id = localStorage.getItem('user');

        http.get(`getProductsThisUser/${id}`).then((response) => {
            setProductsThisUser(response.data);
        })

    }

    return (

        <CartContext.Provider value={{ getProductsThisUser, productsThisUser, selectProduct, productsSelected, total}}>
            {children}
        </CartContext.Provider>

    );

}