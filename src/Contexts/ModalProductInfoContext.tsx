import { SetStateAction, createContext, useState } from "react";
import Product from "../types/Product";

type ModalProductInfoType = {

    productInfo: Product | undefined,
    setProductInfo: React.Dispatch<SetStateAction<Product | undefined>>,
    modalProductInfo: boolean,
    setModalProductInfo: React.Dispatch<SetStateAction<boolean>>,

}

export const ModalProductInfoContext = createContext<ModalProductInfoType>(null!);

export const ModalProductInfoProvider = ({children}: {children: JSX.Element}) => {

    const [productInfo, setProductInfo] = useState<Product>();
    const [modalProductInfo, setModalProductInfo] = useState<boolean>(false);    

    return (
        <ModalProductInfoContext.Provider value={{productInfo, setProductInfo, modalProductInfo, setModalProductInfo}}>

            {children}

        </ModalProductInfoContext.Provider>
    );

}