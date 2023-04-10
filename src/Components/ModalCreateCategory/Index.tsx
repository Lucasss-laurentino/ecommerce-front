import './ModalCreateCategory.css';
import Modal from 'react-bootstrap/Modal';

interface Props {
    modalCategory: boolean,
    setModalCategory: () => void,
}

export default function ModalCategory({ modalCategory, setModalCategory }: Props) {

    return (

        <Modal
            show={modalCategory}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton onHide={setModalCategory}>
                <Modal.Title id="contained-modal-title-vcenter">
                    <p className="m-0 color">Cadastre uma categoria</p>
                    
                </Modal.Title>
            </Modal.Header>
            <Modal.Body>
            </Modal.Body>
        </Modal>


    )

}