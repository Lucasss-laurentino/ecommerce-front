import { useContext, useEffect } from 'react';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { ProductContext } from '../../Contexts/ProductContext';
import { SubCategoryContext } from '../../Contexts/SubCategoryContext';
import { Card_product } from '../Card_product/Index';
import './ListSubCategories.css';
import { Link } from 'react-router-dom';

export const ListSubCategories = () => {

    const { getCategoryDefault, category_default, category } = useContext(CategoryContext);

    const { getSubCategories, subCategories } = useContext(SubCategoryContext);

    const { getProductThisCategory } = useContext(ProductContext);

    const { products } = useContext(ProductContext);

    useEffect(() => {

        if (category) {

            getSubCategories(category.id);
            getProductThisCategory(category.id);

        } else {

            if (category_default) {
                getSubCategories(category_default.id);
                getProductThisCategory(category_default.id);
            }

        }

    }, [category, category_default]);

    return (
        <>
            {subCategories?.map((subCategory) =>
                <div className="row m-0 my-5" key={subCategory.id}>
                    <div className="container d-flex justify-content-between align-items-center">
                        <h2 className=''>{subCategory.name}</h2>
                        <Link to={`/${subCategory.name}`} className='m-0 text-dark d-flex align-items-center'>
                            ver tudo
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-arrow-right-circle" viewBox="0 0 16 16">
                                <path fillRule="evenodd" d="M1 8a7 7 0 1 0 14 0A7 7 0 0 0 1 8zm15 0A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5H4.5z" />
                            </svg>
                        </Link>
                    </div>
                    <div className="container d-flex roll">
                        {products?.map((product) => product.sub_categories_id === subCategory.id && <Card_product key={product.id} product={product} />)}
                    </div>

                </div>
            )}

        </>
    );

}