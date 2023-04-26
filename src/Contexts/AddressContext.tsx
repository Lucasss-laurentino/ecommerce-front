import { createContext, useState } from "react";
import { http } from "../http/http";
import Address from "../types/Address";

type AddressType = {

    addresses: Address[],
    getAddresses: (id_user: number) => void,
    createAddress: (data: any) => void,
    deleteAddress: (id_address: number) => void,

}

export const AddressContext = createContext<AddressType>(null!);

export const AddressProvider = ({children}: {children: JSX.Element}) => {

    const [addresses, setAddresses] = useState<Address[]>([]);

    const getAddresses = (id_user: number) => {

        http.get(`getAddress/${id_user}`).then((response) => {
            setAddresses([...response.data]);
        })

    }

    const createAddress = (dataAddress: any) => {

        const user_id = localStorage.getItem('user');

        http.post('createAddress', { dataAddress, user_id }).then((response) => {

            setAddresses([...response.data]);

        })

    }

    const deleteAddress = (id_address: number) => {

        http.delete(`deleteAddress/${id_address}`).then((response) => {
            setAddresses([...response.data]);
        })

    }

    return (
        <AddressContext.Provider value={{addresses, getAddresses, createAddress, deleteAddress}}>
            {children}
        </AddressContext.Provider>
    );

}