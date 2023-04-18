import { useContext, useEffect } from 'react';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { ProductContext } from '../../Contexts/ProductContext';
import { SubCategoryContext } from '../../Contexts/SubCategoryContext';
import { Card_product } from '../Card_product/Index';
import './ListSubCategories.css';

export const ListSubCategories = () => {

    const {getCategoryDefault, category_default, category} = useContext(CategoryContext);

    const { getSubCategories, subCategories } = useContext(SubCategoryContext);
    
    const { getProductThisCategory } = useContext(ProductContext);

    const { products } = useContext(ProductContext);

    useEffect(() => {

        if(category){

            getSubCategories(category.id);
            getProductThisCategory(category.id);

        }else {

            if(category_default){
                getSubCategories(category_default.id);
                getProductThisCategory(category_default.id);
            }

        }
       
    }, [category, category_default]);
    
    
    return (
        <>
            {subCategories?.map((subCategory) =>         
            <div className="row m-0 my-5" key={subCategory.id}>
                <h2 className=''>{subCategory.name}</h2>
                <div className="container d-flex roll">
                {products?.map((product) => product.sub_categories_id === subCategory.id && <Card_product key={product.id} product={product} />)}
                </div>

            </div>
            )}
        
        </>
    );

}