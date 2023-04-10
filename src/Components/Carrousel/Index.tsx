import Carousel from 'react-bootstrap/Carousel';

export const Carrousel = () => {


    return (
        <Carousel interval={3000}>
            <Carousel.Item>
                <img
                    className='d-block img-fluid size-image'
                    src='../../../public/img/Banner1.png'
                    alt="First slide" />
            </Carousel.Item>
            <Carousel.Item>
                <img
                    className='d-block img-fluid size-image'
                    src=''
                    alt="Third slide" />
            </Carousel.Item>
        </Carousel>
    );
}