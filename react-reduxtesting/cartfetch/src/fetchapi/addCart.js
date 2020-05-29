import addToCart from '../actions/addToCart';
import axios from 'axios';

const addCart = () => {
    return (dispatch) => {
        return axios.post('http://localhost:4000/',
            { "name": "naveen", "title": "Nothing" })
            .then(response => {
                console.log(response);
                dispatch(addToCart(response))
            })
            .catch(error => {
                throw (error);
            });
    };
};

export default addCart