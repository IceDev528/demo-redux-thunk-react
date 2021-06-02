import * as types from '../actions/actionTypes'

const getNewID = items => {
    var maxID = 0
    for(var i = 0; i < items.length; i++) {
        if( maxID < items[i].id ) {
            maxID = items[i].id
        }
    }

    return maxID + 1
}

const cardsReducer = (state = [], action) => {
    switch (action.type) {
        case types.SET_ITEMS: {
            action.data.id = getNewID(state)
            return [
                ...state,
                action.data
            ]
        }
        case types.UPDATE_ITEMS: {
            let item = state.filter( (val) => {
                return val.id === action.data.id
            })
            
            if( item.length > 0 && item[0].top < action.data.top ) {
                item[0].top = action.data.top
            } 
            return [ ...state ]
        }
        case types.UPDATE_TIMER: {
            let item = state.filter( (val) => {
                return val.id === action.data.id
            })
            
            if( item.length > 0 && item[0].time > 0 ) {
                item[0].time = action.data.time
            } 
            return [ ...state ]
        }
    }
}

export default cardsReducer