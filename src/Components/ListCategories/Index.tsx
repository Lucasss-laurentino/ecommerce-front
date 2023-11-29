import { useContext, useEffect } from 'react';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { SubCategoryContext } from '../../Contexts/SubCategoryContext';
import './ListCategories.css';

export const ListCategories = () => {

    const { categories, getCategory } = useContext(CategoryContext);

    const { getSubCategories } = useContext(SubCategoryContext);

    
    const selectCategory = (id: string) => {

        getCategory(id);
        getSubCategories(id);

    }
    

    return (
        <>
        <div className="container-fluid d-flex border-list-categories">
            <ul className="list-inline my-3 d-flex">
                {categories && categories.map((category) => 
                <li key={category._id} className="inline-item mx-3 font-garlicha h2">
                    <button className='bg-white border border-white letterSpacing' onClick={() => selectCategory(category._id)}>
                        {category.name}
                    </button>
                </li>
                )}
            </ul>
        </div>
        </>
    )
}