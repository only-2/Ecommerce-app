const initState = {
    addedItems: [],
    pending: false,
    error: null,
    total: 0
}

const carreducer = (state = initState, action) => {
    if (action.type === 'FETCH_ADD_SUCCESS') {
        return {
            ...state,
            pending: false,
            addeditems: action.addedItems
        }
    }
    if (action.type === 'FETCH_ADD_ERROR') {
        return {
            ...state,
            pending: false,
            error: action.error
        }
    }
    if (action.type === 'FETCH_ADD_PENDING') {
        return {
            ...state,
            pending: true
        }
    }
    if (action.type === 'ADD_QUANTITY') {

        let addedItem = state.addedItems.find(addedItem => addedItem.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === 'SUB_QUANTITY') {
        let addedItem = state.addedItems.find(addedItem => addedItem.id === action.id)
        //if the qt == 0 then it should be removed
        if (addedItem.quantity === 1) {
            let new_items = state.addedItems.filter(item => item.id !== action.id)
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                addedItems: new_items,
                total: newTotal
            }
        }
        else {
            addedItem.quantity -= 1
            let newTotal = state.total - addedItem.price
            return {
                ...state,
                total: newTotal
            }
        }
    }
    if (action.type === 'REMOVE_ITEM') {
        let itemToRemove = state.addedItems.find(addedItem => action.id === addedItem.id)
        let new_items = state.addedItems.filter(addedItem => action.id !== addedItem.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    if (action.type === 'ADD_TO_CART') {
        return state
    }
    return {
        state
    }
}

export default carreducer