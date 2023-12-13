import { SetStateAction, createContext, useState } from "react";
import { http } from "../http/http";
import Address from "../types/Address";

type AddressType = {

    addresses: Address[],
    modalAddresses: boolean,
    setModalAddresses: React.Dispatch<SetStateAction<boolean>>,
    priceDeliveryAddressDefault: number,
    getPriceDeliveryAddressDefault: () => void,
    getAddresses: () => void,
    createAddress: (data: any) => void,
    deleteAddress: (id_address: string) => void,
    defaultAddress: (address_id: string) => void,

}

export const AddressContext = createContext<AddressType>(null!);

export const AddressProvider = ({children}: {children: JSX.Element}) => {

    const [addresses, setAddresses] = useState<Address[]>([]);

    const [priceDeliveryAddressDefault, setPriceDeliveryAddressDefault] = useState<number>(0);

    const [modalAddresses, setModalAddresses] = useState<boolean>(false);

    const getAddresses = () => {

        http.get('/getAddresses').then((response) => {
            setAddresses([...response.data.addresses]);
        });

    }

    const createAddress = (dataAddress: any) => {

        http.post('/createAddress', { dataAddress }).then((response) => {
            setAddresses([...addresses, response.data.newAddress]);
        });

    }

    const deleteAddress = (id_address: string) => {

        http.delete(`deleteAddress/${id_address}`).then((response) => {
            setAddresses([...response.data.allAddresses]);
        })

    }

    const getPriceDeliveryAddressDefault = () => {

        addresses.map(address => {

            if(address.default){

                let args = {
                    sCepOrigem: '01153 000',
                    sCepDestino: address.cep,
                    nVlPeso: '1',
                    nCdFormato: '1',
                    nVlComprimento: '20',
                    nVlAltura: '20',
                    nVlLargura: '20',
                    nVlDiametro: '0',
                    nCdServico: '04014',
                    nCdEmpresa: '',
                    sDsSenha: '',
                    sCdMaoPropria: 'n',
                    nVlValorDeclarado: '0',
                    sCdAvisoRecebimento: 'n',
                    StrRetorno: 'xml',
                    nIndicaCalculo: '3',
                };
        
                http.post('getPriceCorreio', { args }).then((response) => {
                    setPriceDeliveryAddressDefault(response.data.cServico.Valor)        
                })

            }

        })
    
    }

    const defaultAddress = (address_id: string) => {

        http.post('/defaultAddress', {address_id: address_id}).then((response) => {

            setAddresses([...response.data]);

        })

    }

    return (
        <AddressContext.Provider value={{addresses, getAddresses, createAddress, deleteAddress, priceDeliveryAddressDefault, getPriceDeliveryAddressDefault, setModalAddresses, modalAddresses, defaultAddress}}>
            {children}
        </AddressContext.Provider>
    );

}