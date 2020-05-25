import fetchAddSuccess from '../actions/fetchAddSuccess';
import fetchAddError from '../actions/fetchAddError';
import fetchAddPending from '../actions/fetchAddPending';

const fetchCart = () => {
    return dispatch => {
        dispatch(fetchAddPending());
        fetch('https://jsonplaceholder.typicode.com/posts')
            .then(res => res.json())
            .then(res => {
                if (res.error) {
                    throw res.error;
                }
                console.log("Inside Fetch");

                console.log(res);

                dispatch(fetchAddSuccess(res));
                return res.products;
            })
            .catch(error => {
                dispatch(fetchAddError(error));
            })
    }
}

export default fetchCart;