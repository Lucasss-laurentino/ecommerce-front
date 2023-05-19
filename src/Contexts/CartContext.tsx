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

        const user_id = localStorage.getItem('user');

        http.get(`getCarts/${user_id}`).then((response) => {
            setCarts([...response.data]);
        })

    }

    const selectProduct = (cart: Cart) => {

        const user_id = localStorage.getItem('user');

        const checkbox = document.getElementById(cart.name_product);

        if(checkbox?.getAttribute('checked')){
            
            checkbox.removeAttribute('checked');

            http.post('checkCart', {selected: false, id_cart: cart.id, user_id: user_id}).then((response) => {
                setCarts([...response.data]);
            })

            setTotal(total - Number(cart.price_product) * cart.quantity);

        } else {

            checkbox?.setAttribute('checked', 'checked');

            http.post('checkCart', {selected: true, id_cart: cart.id, user_id: user_id}).then((response) => {
                setCarts([...response.data]);
            })

        }


    }

    const moreQuantity = (cart: Cart) => {
        
        const user_id = localStorage.getItem('user');

        http.post('moreQuantity', {user_id: user_id, product_id: cart.products_id }).then((response) => {
            setCarts([...response.data]);
        })

    }

    const anyLessQuantity = (cart: Cart) => {
        
        const user_id = localStorage.getItem('user');

        http.post('anyLessQuantity', {user_id: user_id, product_id: cart.products_id }).then((response) => {
            setCarts([...response.data]);
        })

    }

    const resetQuantity = () => {
        
        const user_id = localStorage.getItem('user');

        http.post('resetQuantity', {user_id: user_id}).then((response) => {

            setCarts([...response.data]);

        })
    
    }

    const deleteCart = (cart: Cart) => {
        
        const cart_id = cart.products_id;
        const user_id = localStorage.getItem('user');
        
        http.delete(`deleteCart/${cart_id}/${user_id}`).then((response) => {
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