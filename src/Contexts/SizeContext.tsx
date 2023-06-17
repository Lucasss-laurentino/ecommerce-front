import { createContext, useState } from "react";
import { http } from "../http/http";
import Size from "../types/Size";

type SizeType = {
    sizes: Size[] | undefined,
    getSizes: (id: number) => void,
    sizeSelect: (size: Size) => void,
    sizeSelected: Size | undefined,
}

export const SizeContext = createContext<SizeType>(null!);

export const SizeProvider = ({children}: {children: JSX.Element}) => {

    const [sizes, setSizes] = useState<Size[]>([]);

    const [sizeSelected, setSizeSelected] = useState<Size | undefined>();

    const getSizes = (id: number) => {

        http.get(`getSizeThisProduct/${id}`).then((response) => {
           setSizes(response.data)
        })

    }

    const sizeSelect = (size: Size) => {

        setSizeSelected(size);

    }

    return (

        <SizeContext.Provider value={{sizes, getSizes, sizeSelect, sizeSelected}}>
            {children}
        </SizeContext.Provider>

    );

}