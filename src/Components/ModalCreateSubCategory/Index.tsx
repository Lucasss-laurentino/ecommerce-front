import { useContext, useEffect, useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import { useForm } from 'react-hook-form';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { SubCategoryContext } from '../../Contexts/SubCategoryContext';
import './ModalCreateSubCategory.css';

interface Props {
    modalSubCategory: boolean,
    setModalSubCategory: () => void,
}

export const ModalCreateSubCategory = ({ modalSubCategory, setModalSubCategory }: Props) => {

    const { categories } = useContext(CategoryContext);

    const { getSubCategories, subCategories, createSubCategory, deleteSubCategory } = useContext(SubCategoryContext);

    const { register, handleSubmit, reset, formState: { errors } } = useForm();

    const [classListCategories, setClassListCategories] = useState('d-block p-0');

    const [category_id, setCategory_id] = useState<string>('');

    const [classFormSubCategory, setClassFormSubCategory] = useState("container d-none justify-content-center");

    const [classListSubCategories, setClassListSubCategories] = useState('d-none');

    const [titleForm, setTitleForm] = useState('Escolha uma categoria');

    const [btnReturn, setBtnReturn] = useState('d-none');

    useEffect(() => {

        if(category_id) {

            getSubCategories(category_id);

        }

    },[subCategories]);

    const showFormCreateSubCategories = (category_id: string) => {

        getSubCategories(category_id);
        setCategory_id(category_id);

        setClassListCategories('d-none');
        setClassFormSubCategory("container d-block justify-content-center");
        setClassListSubCategories('d-block p-0')
        setTitleForm('Cadastre uma sub categoria');
        setBtnReturn('btn-sm bg-white border border-white');
        
    }

    const returnListCategory = () => {

        setClassListCategories('d-block p-0');
        setClassListSubCategories('d-none');
        setTitleForm('Escolha uma categoria');
        setClassFormSubCategory("container d-none justify-content-center");
        setBtnReturn('d-none')
        reset();
    
    }

    const sendDataSubCategory = (e: any) => {

        const subCategoryName = e.subCategoryName;

        const categoryId = category_id;

        createSubCategory(subCategoryName, categoryId);

        reset();

    }

    const closeModal = () => {
        setModalSubCategory();
        returnListCategory();
    }

    return (
        <Modal
            show={modalSubCategory}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={closeModal}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="m-0 color font-garlicha h1">{titleForm}</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Categorias existentes */}
                <div className="container">
                    <button className={btnReturn} onClick={returnListCategory}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-backspace" viewBox="0 0 16 16">
                            <path d="M5.83 5.146a.5.5 0 0 0 0 .708L7.975 8l-2.147 2.146a.5.5 0 0 0 .707.708l2.147-2.147 2.146 2.147a.5.5 0 0 0 .707-.708L9.39 8l2.146-2.146a.5.5 0 0 0-.707-.708L8.683 7.293 6.536 5.146a.5.5 0 0 0-.707 0z" />
                            <path d="M13.683 1a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2h-7.08a2 2 0 0 1-1.519-.698L.241 8.65a1 1 0 0 1 0-1.302L5.084 1.7A2 2 0 0 1 6.603 1h7.08zm-7.08 1a1 1 0 0 0-.76.35L1 8l4.844 5.65a1 1 0 0 0 .759.35h7.08a1 1 0 0 0 1-1V3a1 1 0 0 0-1-1h-7.08z" />
                        </svg>
                    </button>
                    <ul className={classListCategories}>
                        {categories && categories.map((category) =>
                            <li key={category?._id} className="d-flex justify-content-center h5 list-categories-hover">
                                <button className='m-0 bg-white border border-white' onClick={() => showFormCreateSubCategories(category._id)}>{category.name}</button>
                            </li>
                        )}
                    </ul>

                    { /* Sub categorias existentes */}
                    <ul className={classListSubCategories}>
                        {subCategories && subCategories.map((subCategory) =>
                            <li key={subCategory?._id} className="d-flex justify-content-between h5 list-categories-hover">
                                <button className='m-0 bg-white border border-white'>{subCategory?.name}</button>

                                <div className="container d-flex align-items-center justify-content-end">
                                    <button className='btn-edit'>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                            <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                        </svg>
                                    </button>
                                    <button className='btn-delete' onClick={() => deleteSubCategory(subCategory._id)}>
                                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                        </svg>
                                    </button>
                                </div>
                            </li>
                        )}
                    </ul>

                </div>
                {/* form sub categoria */}
                <hr />
                <div className={classFormSubCategory}>
                    <form className='my-3' onSubmit={(e) => handleSubmit(sendDataSubCategory)(e)}>
                        <div className="form-group">
                            <input type="text" {...register('subCategoryName', { required: true })} className="input-form-login" placeholder="Sub categoria" />
                        </div>
                        <button type="submit" className="btn-login my-3">cadastrar</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>

    )
}