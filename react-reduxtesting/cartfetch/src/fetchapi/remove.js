import removeItem from '../actions/removeItem'

const remove = (id) => {
    return (dispatch) => {

        return axios.post(`${apiUrl}/add`, id)
            .then(response => {
                console.log(response.data);

                dispatch(removeItem(response.data))
            })
            .catch(error => {
                throw (error);
            });
    };
}

export default remove