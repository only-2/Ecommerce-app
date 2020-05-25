const addToCart = (id) => {
    console.log("inside addtocart");

    return {
        type: 'ADD_TO_CART',
        id: id
    }
}

export default addToCart
