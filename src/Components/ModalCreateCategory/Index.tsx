import './ModalCreateCategory.css';
import Modal from 'react-bootstrap/Modal';
import { useContext, useState } from 'react';
import { CategoryContext } from '../../Contexts/CategoryContext';

interface Props {
    modalCategory: boolean,
    setModalCategory: () => void,
}

export default function ModalCategory({ modalCategory, setModalCategory }: Props) {

    const { categories, createCategory, deleteCategory, categoryDefault } = useContext(CategoryContext);

    const [name, setName] = useState<string>('');
    const [imageOne, setImageOne] = useState<File | null>(null);
    const [imageTwo, setImageTwo] = useState<File | null>(null);

    const selectImageOne = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.files?.length) {
            setImageOne(event.target.files[0]);
        } else {
            setImageOne(null);
        }
        
    }

    const selectImageTwo = (event: React.ChangeEvent<HTMLInputElement>) => {

        if(event.target.files?.length) {
            setImageTwo(event.target.files[0]);
        } else {
            setImageTwo(null);
        }

    }

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {

        event.preventDefault();

        const formData = new FormData();

        if(name && imageOne && imageTwo){
            formData.append('category', name);
            formData.append('imageOne', imageOne);
            formData.append('imageTwo', imageTwo);    
        }

        createCategory(formData);

        setName('');
        setImageOne(null);
        setImageTwo(null);

    }

    return (
        <Modal
            show={modalCategory}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={setModalCategory}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="m-0 color font-garlicha h1">Cadastre uma categoria</p>
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {/* Categorias existentes */}
                <ul className='scrol-list-categories'>
                    {categories && categories.map((category) =>
                        <li key={category?.id} className="d-flex justify-content-between">
                            <p className='m-0'>{category?.name}</p>
                            <div className="container d-flex align-items-center justify-content-end">
                                <button className='btn-edit'>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-pencil-square" viewBox="0 0 16 16">
                                        <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z" />
                                        <path fillRule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5v11z" />
                                    </svg>
                                </button>
                                <button className='btn-delete' onClick={() => deleteCategory(category.id)}>
                                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                        <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5Zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6Z" />
                                        <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1ZM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118ZM2.5 3h11V2h-11v1Z" />
                                    </svg>
                                </button>
                                <button className={category.default ? 'bg-white border border-white text-success text-decoration-underline' : 'bg-white border border-white text-muted'} onClick={() => categoryDefault(category.id)}>Default</button>
                            </div>
                        </li>
                    )}
                </ul>
                {/* form categoria */ }
                <hr/>
                <div className="container d-flex justify-content-center">
                    <form onSubmit={handleSubmit}>
                        <input type="text" className='input-form-login' value={name} onChange={(value) => setName(value.target.value)} placeholder='nome da categoria'/>
                        <input type="file" className='form-control my-4' accept='image/*' onChange={selectImageOne}/>
                        <input type="file" className='form-control my-4' accept='image/*' onChange={selectImageTwo}/>
                        <button type='submit' className='btn-login'>Cadastrar</button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}