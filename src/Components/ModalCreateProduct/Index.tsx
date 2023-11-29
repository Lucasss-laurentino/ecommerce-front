import { useContext, useEffect, useState } from 'react';
import { Modal } from 'react-bootstrap';
import { useForm } from 'react-hook-form';
import { CategoryContext } from '../../Contexts/CategoryContext';
import { ProductContext } from '../../Contexts/ProductContext';
import { SubCategoryContext } from '../../Contexts/SubCategoryContext';
import { http } from '../../http/http';
import './ModalCreateProduct.css';

interface Props {
    modalCreateProduct: boolean,
    setModalCreateProduct: () => void,
}

export const ModalCreateProduct = ({modalCreateProduct, setModalCreateProduct}: Props) => {
    
    const { register, reset, handleSubmit, formState: { errors } } = useForm();

    const { setProducts } = useContext(ProductContext);

    const { subCategories, getSubCategories } = useContext(SubCategoryContext);

    const { categories }  = useContext(CategoryContext);

    const [sizes, setSizes] = useState({
        sizeP: false,
        sizeM: false,
        sizeG: false,
        sizeGG: false,
    });

    useEffect(() => {

        if(sizes){
            setErrorCheckBox('')
        }

    }, [sizes]);

    const [quantity, setQuantity] = useState({
        quantityP: '',
        quantityM: '',
        quantityG: '',
        quantityGG: '',
    });

    const [category, setCategory] = useState<string | undefined>();
    const [subCategory, setSubCategory] = useState<number>();
    const [imageOne, setImageOne] = useState<File | null>();
    const [imageTwo, setImageTwo] = useState<File | null>();
    const [imageThree, setImageThree] = useState<File | null>();

    const [errorCheckBox, setErrorCheckBox] = useState('');

    const closeAndReset = () => {

        setSizes((prev) => {

            const newSizes = {...prev, 
                sizeP: false,
                sizeM: false,
                sizeG: false,
                sizeGG: false            
            }

            return newSizes;

        })

        setQuantity((prev) => {

            const newQuantity = {...prev, 
                
                quantityP: '',
                quantityM: '',
                quantityG: '',
                quantityGG: ''

            }

            return newQuantity

        })

        setModalCreateProduct();
        setModalCreateProduct();
        reset();

    }

    const selectCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {

        getSubCategories(event.target.value);

        setCategory(event.target.value);

    }

    const selectSubCategory = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setSubCategory(Number(event?.target.value));
    }

    const handleChangeCheckBox = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.checked === false) { // Ao desmarcar checkbox

            setQuantity((prev) => { // zerar valor input quantity de checkbox marcado

                const name = 'quantity' + event.target.id;

                const newQuantity = { ...prev, [name]: '' }

                return newQuantity

            })

        }

        setSizes((prev) => { // marcar ou desmarcar checkbox

            const { name } = event.target;

            const newSize = { ...prev, [name]: event.target.checked }

            return newSize

        });

    }

    const handleQuantity = (event: React.ChangeEvent<HTMLInputElement>) => {

        setQuantity((prev) => {

            const { name, value } = event.target;

            const newQuantity = { ...prev, [name]: value }

            return newQuantity

        });

    }

    const selectImageOne = (event: React.ChangeEvent<HTMLInputElement>) => {

        if (event.target.files?.length) {
            setImageOne(event.target.files[0]);
        } else {
            setImageOne(null);
        }

    }

    const selectImageTwo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImageTwo(event.target.files[0]);
        } else {
            setImageTwo(null);
        }
    }

    const selectImageThree = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImageThree(event.target.files[0]);
        } else {
            setImageThree(null);
        }
    }

    const createProduct = (data: any) => {        
        
        if (sizes.sizeP || sizes.sizeM || sizes.sizeG || sizes.sizeGG) {

            const formData = new FormData();

            formData.append('name', data.name);
            formData.append('manufacturer', data.manufacturer);
            formData.append('price', data.price);

            if (sizes.sizeP) {
                formData.append('sizeP', JSON.stringify(sizes.sizeP));
                formData.append('quantityP', quantity.quantityP);
            }

            if (sizes.sizeM) {
                formData.append('sizeM', JSON.stringify(sizes.sizeM));
                formData.append('quantityM', quantity.quantityM);

            }

            if (sizes.sizeG) {
                formData.append('sizeG', JSON.stringify(sizes.sizeG));
                formData.append('quantityG', quantity.quantityG);

            }

            if (sizes.sizeGG) {
                formData.append('sizeGG', JSON.stringify(sizes.sizeGG));
                formData.append('quantityGG', quantity.quantityGG);
            }

            formData.append('id_category', data.category);
            formData.append('id_subCategory', data.subCategory);

            if (imageOne && imageTwo) {
                formData.append('image', imageOne);
                formData.append('image', imageTwo);
            }

            if (imageOne && imageTwo && imageThree) {
                formData.append('image', imageOne);
                formData.append('image', imageTwo);
                formData.append('image', imageThree);
            }

            http.request({
        
                url: '/createProduct',
                method: 'post',
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
                data: formData,
        
            }).then(response => {

                console.log(response.data); 
                setProducts([...response.data.products])

                closeAndReset();

            });
            
        
        } else {
        
            setErrorCheckBox('Selecione pelo menos um tamanho')
        
        }
        

    }

    return (    

        <>
            <Modal
                show={modalCreateProduct}
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
            >
                <Modal.Header closeButton onHide={closeAndReset}>
                    <Modal.Title id="contained-modal-title-vcenter">
                        <p className="m-0 p-create-product font-garlicha h1">Cadastre um produto</p>
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit(createProduct)}>

                        <div className="form-group">
                            <input
                                type="text"
                                className="input-form-login my-2"
                                placeholder="Nome"
                                {...register("name")}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="input-form-login my-2"
                                placeholder="Fabricante"
                                {...register("manufacturer")}
                            />
                        </div>

                        <div className="form-group">
                            <input
                                type="text"
                                className="input-form-login my-2"
                                placeholder="preço"
                                {...register("price")}
                            />
                        </div>

                        <div className="form-group">
                            <select
                                className="input-form-login my-3"
                                aria-label="Default select example"
                                {...register("category", {
                                    onChange: selectCategory
                                })}
                            >

                                <option value="">Selecione uma categoria</option>
                                {categories?.map((category) => {
                                    return (
                                        <option key={category._id} value={category._id}>{category.name}</option>
                                    )
                                })}

                            </select>
                        </div>

                        <div className="form-group">
                            <select
                                className="input-form-login my-2"
                                aria-label="Default select example"
                                {...register("subCategory", {
                                    onChange: selectSubCategory
                                })}
                            >

                                <option value="">Selecione uma sub categoria</option>
                                {category && subCategories?.map((subCategory) => {
                                    return (
                                        <option key={subCategory._id} value={subCategory._id}>{subCategory.name}</option>
                                    )
                                })}

                            </select>
                        </div>

                        <div className="form-check form-check-inline my-2">

                            <input
                                name="sizeP"
                                className="form-check-input"
                                type="checkbox"
                                checked={sizes.sizeP}
                                id="P"
                                onChange={handleChangeCheckBox}
                                value="sizeP"
                            />

                            <label className="p-create-product" htmlFor="inlineCheckbox1">P</label>

                        </div>

                        <div className="form-check form-check-inline my-2">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                name="sizeM"
                                checked={sizes.sizeM}
                                onChange={handleChangeCheckBox}
                            />

                            <label className="p-create-product" htmlFor="inlineCheckbox2">M</label>

                        </div>

                        <div className="form-check form-check-inline my-2">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                name="sizeG"
                                onChange={handleChangeCheckBox}
                                checked={sizes.sizeG}
                            />

                            <label className="p-create-product" htmlFor="inlineCheckbox2">G</label>

                        </div>

                        <div className="form-check form-check-inline my-2">

                            <input
                                className="form-check-input"
                                type="checkbox"
                                id="inlineCheckbox2"
                                name="sizeGG"
                                onChange={handleChangeCheckBox}
                                checked={sizes.sizeGG}
                            />

                            <label className="p-create-product" htmlFor="inlineCheckbox2">GG</label>

                        </div>

                        <p className="errors-create-product">{errorCheckBox}</p>

                        {sizes.sizeP &&
                            <div className="my-3">
                                <input
                                    type="number"
                                    className='input-form-login'
                                    placeholder='Quantidade P'
                                    required
                                    name="quantityP"
                                    value={quantity.quantityP}
                                    onChange={handleQuantity}
                                />
                            </div>
                        }

                        {sizes.sizeM &&
                            <div className="my-3">
                                <input
                                    type="number"
                                    className='input-form-login'
                                    placeholder='Quantidade M'
                                    name="quantityM"
                                    required
                                    value={quantity.quantityM}
                                    onChange={handleQuantity}
                                />
                            </div>
                        }

                        {sizes.sizeG &&
                            <div className="my-3">
                                <input
                                    type="number"
                                    className='input-form-login'
                                    placeholder='Quantidade G'
                                    name="quantityG"
                                    required
                                    value={quantity.quantityG}
                                    onChange={handleQuantity}
                                />
                            </div>
                        }

                        {sizes.sizeGG &&
                            <div className="my-3">
                                <input
                                    type="number"
                                    className='input-form-login'
                                    placeholder='Quantidade GG'
                                    name="quantityGG"
                                    required
                                    value={quantity.quantityGG}
                                    onChange={handleQuantity}
                                />
                            </div>
                        }

                        <div className="my-3">
                            <label htmlFor="formFileSm" className="p-create-product my-1">Carregue uma imagem para capa do produto:</label>
                            <input
                                className="form-control form-control-sm"
                                id="formFileSm"
                                required
                                type="file"
                                onChange={selectImageOne}
                                name="image"
                            />
                        </div>

                        <div className="my-2">
                            <label htmlFor="formFileSm" className="p-create-product my-2">Carregue outras duas imagens do produto:</label>
                            <input
                                className="form-control form-control-sm"
                                id="formFileSm"
                                type="file"
                                required
                                onChange={selectImageTwo}
                            />
                        </div>

                        <div className="my-2">
                            <input
                                className="form-control form-control-sm"
                                onChange={selectImageThree}
                                id="formFileSm"
                                type="file"
                            />
                        </div>

                        <button type="submit" className="btn-login">Cadastrar</button>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                </Modal.Footer>
            </Modal>
        </>

    );
}