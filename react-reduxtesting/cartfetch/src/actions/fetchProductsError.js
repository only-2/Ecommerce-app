const fetchProductsError = (error) => {
    return {
        type: 'FETCH_PRODUCTS_PENDING',
        error: error
    }
}
export default fetchProductsError