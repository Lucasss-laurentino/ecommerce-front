import { useContext } from "react";
import Cart from "../../types/Cart";
import { CartContext } from "../../Contexts/CartContext";

interface Props {
    productCart: Cart,
}

export default function Quantity({productCart}: Props) {

    const { anyLessQuantity, moreQuantity } = useContext(CartContext);

    if(productCart.selected){

        return (
            <div>
                <button className='bg-white border border-white' onClick={() => anyLessQuantity(productCart)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-left" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z" />
                    </svg>
                </button>
                <span className='quantity'>{productCart.quantity}</span>
                <button className='bg-white border border-white' onClick={() => moreQuantity(productCart)}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8z" />
                    </svg>
                </button>
            </div>
        );
    
    } else {
        return (<></>);
    }

}