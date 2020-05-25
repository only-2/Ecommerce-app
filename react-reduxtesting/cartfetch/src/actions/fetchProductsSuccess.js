const fetchProductsSuccess = (items) => {
    return {
        type: 'FETCH_PRODUCTS_SUCCESS',
        items: items
    }
}
export default fetchProductsSuccess