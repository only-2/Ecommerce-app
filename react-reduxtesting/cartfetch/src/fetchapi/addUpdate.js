import addQuantity from '../actions/addQuantity'

const addUpdate = (id) => {
    return (dispatch) => {

        return axios.post(`${apiUrl}/add`, id)
            .then(response => {
                console.log(response.data);

                dispatch(addQuantity(response.data))
            })
            .catch(error => {
                throw (error);
            });
    };
}

export default addUpdate