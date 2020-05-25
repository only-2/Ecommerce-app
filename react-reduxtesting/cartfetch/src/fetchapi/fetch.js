import fetchProductPending from '../actions/fetchProductsPending';
import fetchProductsError from '../actions/fetchProductsError';
import fetchProdutsSuccess from '../actions/fetchProductsSuccess';


const fetchProducts = () => {
    return dispatch => {
        dispatch(fetchProductPending());
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                console.log("Inside Fetch Products");

                console.log(res);

                dispatch(fetchProdutsSuccess(res));
                return res.products;
            })
            .catch(error => {
                dispatch(fetchProductsError(error));
            })
    }
}

export default fetchProducts;