import './Carrousel.css';
import { useContext, useEffect } from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { CategoryContext } from '../../Contexts/CategoryContext';

export const Carrousel = () => {

    const { getCategoryDefault, category, category_default } = useContext(CategoryContext);

    useEffect(() => {

        getCategoryDefault();

    }, []);

    return (
        <Carousel interval={2000}>
            <Carousel.Item>
                <div className="div-img">
                    <img
                        src={category ? category.banner1 : category_default?.banner1}
                        alt="First slide"
                        className='img-fluid'
                    />
                </div>
            </Carousel.Item>
            <Carousel.Item >
                <img
                    src={category ? category.banner2 : category_default?.banner2}
                    alt="Third slide"
                    className='img-fluid'
                />
            </Carousel.Item>
        </Carousel>
    );
}