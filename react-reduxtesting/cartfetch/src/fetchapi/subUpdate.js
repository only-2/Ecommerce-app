import subtractQuantity from '../actions/subtractQuantity'

const subUpdate = (id) => {
    return (dispatch) => {

        return axios.post(`${apiUrl}/add`, id)
            .then(response => {
                console.log(response.data);

                dispatch(subtractQuantity(response.data))
            })
            .catch(error => {
                throw (error);
            });
    };
}

export default subUpdate