import { createContext, useState } from "react";
import Card from "../types/Card";
import { http } from "../http/http";

type CartaoType = {

    cartaoModal: boolean,
    setCartaoModal: React.Dispatch<React.SetStateAction<boolean>>,
    createCard: (card: Card) => void,
    getCartoes: () => void,
    cartoes: Card[],
    cartaoDefault: (card: Card) => void,
    cardDefaultState: Card | undefined,
    getCardDefault: () => void,
}

export const CartaoContext = createContext<CartaoType>(null!);

export const CartaoContextProvider = ({children}: {children: JSX.Element}) => {

    const [cartaoModal, setCartaoModal] = useState<boolean>(false);

    const [cartoes, setCartoes] = useState<Card[]>([]);

    const [cardDefaultState, setCardDefaultState] = useState<Card>();

    const createCard = (card: Card) => {

        http.post('/createCard', {card}).then((response) => {

            console.log(response.data)

            setCartaoModal(false);

        })

    }

    const getCartoes = () => {
       
        http.get('/getCartoes').then((response) => {
            setCartoes([...response.data.allCards]);
        })

    }

    const cartaoDefault = (card: Card) => {
        
        http.post('/cardDefault', {card}).then((response) => {
            getCardDefault();
        })  

    }

    const getCardDefault = () => {

        http.get('/getCardDefault').then((response) => {
            setCardDefaultState(response.data.card);
        })

    }

    return (
        <CartaoContext.Provider value={{cartaoModal, setCartaoModal, createCard, getCartoes, cartoes, cartaoDefault, cardDefaultState, getCardDefault }} >
            {children}
        </CartaoContext.Provider>
    )

}