
const initState = {
    items: [],
    pending: false,
    error: null,
}
const prodReducer = (state = initState, action) => {

    //INSIDE HOME COMPONENT
    if (action.type === 'ADD_TO_CART') {
        return state
    }
    if (action.type === 'REMOVE_ITEM') {
        let itemToRemove = state.addedItems.find(item => action.id === item.id)
        let new_items = state.addedItems.filter(item => action.id !== item.id)

        //calculating the total
        let newTotal = state.total - (itemToRemove.price * itemToRemove.quantity)
        console.log(itemToRemove)
        return {
            ...state,
            addedItems: new_items,
            total: newTotal
        }
    }
    //INSIDE CART COMPONENT
    if (action.type === 'ADD_QUANTITY') {
        let addedItem = state.items.find(item => item.id === action.id)
        addedItem.quantity += 1
        let newTotal = state.total + addedItem.price
        return {
            ...state,
            total: newTotal
        }
    }
    if (action.type === 'SUB_QUANTITY') {
        let addedItem = state.items.find(item => item.id === action.id)
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
    if (action.type === 'FETCH_PRODUCTS_PENDING') {
        return {
            ...state,
            pending: true
        }
    }
    if (action.type === 'FETCH_PRODUCTS_SUCCESS') {
        return {
            ...state,
            pending: false,
            items: action.items
        }
    }
    if (action.type === 'FETCH_PRODUTS_ERROR') {
        return {
            ...state,
            pending: false,
            error: action.error
        }
    }
    return state
}

export default prodReducer