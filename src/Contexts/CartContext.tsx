import { createContext, SetStateAction, useEffect, useState} from "react";
import { http } from "../http/http";
import Product from "../types/Product";
import Cart from "../types/Cart";

type CartType = {

    total: number,
    setTotal: React.Dispatch<SetStateAction<number>>,
    carts: Cart[],
    getCarts: () => void,
    selectProduct: (cart: Cart) => void,
    moreQuantity: (cart: Cart) => void,
    anyLessQuantity: (cart: Cart) => void,
    resetQuantity: () => void,
    deleteCart: (cart: Cart) => void,
}

export const CartContext = createContext<CartType>(null!);

export const CartProvider = ({ children }: { children: JSX.Element }) => {

    const [total, setTotal] = useState<number>(0);
    const [carts, setCarts] = useState<Cart[]>([]);

    useEffect(() => {

        carts.map((cart) => {
            if(cart.selected){
                setTotal(Number(cart.price_product) * cart.quantity);
            }
        })

    }, [carts])

    const getCarts = () => {
        
        http.get(`/getCarts`).then((response) => {
            setCarts([...response.data.productsCart]);
        })

    }

    const selectProduct = (cart: Cart) => {

        
        const checkbox = document.getElementById(cart.name_product);

        if(checkbox?.getAttribute('checked')){
            
            checkbox.removeAttribute('checked');

            http.post('/checkCart', {selected: false, id_cart: cart._id}).then((response) => {
                setCarts([...response.data.carts]);
            })

            setTotal(total - Number(cart.price_product) * cart.quantity);

        } else {

            checkbox?.setAttribute('checked', 'checked');

            http.post('/checkCart', {selected: true, id_cart: cart._id}).then((response) => {
                setCarts([...response.data.carts]);
            })

        }
        


    }

    const moreQuantity = (cart: Cart) => {
    
        http.post('/moreQuantity', {product_id: cart.products_id }).then((response) => {
            setCarts([...response.data.carts]);
        })

    }

    const anyLessQuantity = (cart: Cart) => {
        
        http.post('/anyLessQuantity', { product_id: cart.products_id }).then((response) => {
            setCarts([...response.data]);
        });

    }

    const resetQuantity = () => {
        
        http.post('/resetQuantity').then((response) => {
          
            setCarts([...response.data.carts]);

        })
    
    }

    const deleteCart = (cart: Cart) => {
        
        const cart_id = cart._id;
        
        http.delete(`deleteCart/${cart_id}`).then((response) => {
            console.log(response.data)
            setCarts([...response.data]);
        })
    
    }

    return (

        <CartContext.Provider value={{
            total, setTotal, carts, getCarts, selectProduct, moreQuantity, anyLessQuantity, resetQuantity, deleteCart
        }}>
            {children}
        </CartContext.Provider>

    );

}