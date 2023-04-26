import { useState } from "react";
import { Carrousel } from "../../Components/Carrousel/Index";
import { ListCategories } from "../../Components/ListCategories/Index";
import { ListSubCategories } from "../../Components/ListSubCategories/Index";

export const Vitrine = () => {
    
    return (

        <>

        <Carrousel />

        <ListCategories />

        <ListSubCategories />
        
        </>

    );

}