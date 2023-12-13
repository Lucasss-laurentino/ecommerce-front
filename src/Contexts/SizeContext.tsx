import { createContext, useState } from "react";
import { http } from "../http/http";
import Size from "../types/Size";

type SizeType = {
    sizes: Size[] | undefined,
    getSizes: (id_products: string) => void,
    sizeSelect: (size: Size) => void,
    sizeSelected: Size | undefined,
    setSizeSelected: React.Dispatch<React.SetStateAction<Size | undefined>>,
    changeSizeSelect: (size: Size) => void,
    resetSizes: (id_product_info: string | undefined) => void,
}

export const SizeContext = createContext<SizeType>(null!);

export const SizeProvider = ({children}: {children: JSX.Element}) => {

    const [sizes, setSizes] = useState<Size[]>([]);

    const [sizeSelected, setSizeSelected] = useState<Size | undefined>();

    const getSizes = (id_product: string) => {
        http.get(`getSizeThisProduct/${id_product}`).then((response) => {
           setSizes([...response.data.sizes])
        })

    }

    const sizeSelect = (size: Size) => {

        setSizeSelected(size);

    }

    const changeSizeSelect = (size: Size) => {


        http.post('/changeSize', {size}).then((response) => {
            setSizes([...response.data.allSizes]);
            setSizeSelected(size);
        })

    }

    const resetSizes = (id_product_info: string | undefined) => {
        http.post('/resetSizes', {id_product_info}).then((response) => {
            setSizes([...response.data.allSizes]);
        })
    }

    return (

        <SizeContext.Provider value={{sizes, getSizes, sizeSelect, sizeSelected, setSizeSelected, changeSizeSelect, resetSizes}}>
            {children}
        </SizeContext.Provider>

    );

}