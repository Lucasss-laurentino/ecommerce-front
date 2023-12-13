export default interface Cart {

    _id: number,
    products_id: number,
    sizes_id: number,
    users_id: string,
    quantity: number,
    selected: boolean,
    img_product: string,
    name_product: string,
    price_product: string,

}