import { useContext, useEffect } from 'react';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { SubCategoryContext } from '../../Contexts/SubCategoryContext';
import './ListSubCategories.css';

export const ListSubCategories = () => {

    const {getCategoryDefault, category_default} = useContext(CategoryContext);

    const { getSubCategories, subCategories } = useContext(SubCategoryContext);
    
    useEffect(() => {
        getCategoryDefault();
    }, []);

    useEffect(() => {

        if(category_default){
            getSubCategories(category_default.id);
        }
    }, [category_default]);

    return (
        <>
            {subCategories?.map((subCategory) =>         
            <div className="row m-0 my-5" key={subCategory.id}>
                <h2 className=''>{subCategory.name}</h2>
                <div className="container d-flex roll">
                </div>

            </div>
            )}
        
        </>
    );

}