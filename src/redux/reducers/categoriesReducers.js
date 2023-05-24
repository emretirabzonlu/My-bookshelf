import actionTypes from "../actions/acitonTypes";

const initialState = {
    pending: false,
    success: false,
    categories: [],
    fail: false,
    error: ""
}

const categoriesReducers = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.categoryActions.GET_CATEGORIES_START:
            return {
                ...state,
                pending: true
            }
        case actionTypes.categoryActions.GET_CATEGORIES_SUCCESS:
            return {
                ...state,
                pending: false,
                success: true,
                fail: false,
                categories: action.payload
            }
        case actionTypes.categoryActions.GET_CATEGORIES_START:
            return {
                ...state,
                pending: false,
                success: false,
                fail: true,
                error: action.payload
            }
        case actionTypes.categoryActions.ADD_CATEGORY:
            return {
                ...state,
                categories: [...state.categories, action.payload]
            }
        case actionTypes.categoryActions.DELETE_CATEGORY:

            var filteredCategories = state.categories.filter(item => item.id !== action.payload)
            return {
                ...state,
                categories: filteredCategories
            }
        case actionTypes.categoryActions.EDİT_CATEGORY:
            var tempArr=[]
            for (let i = 0; i <state.categories.length; i++) {
               if(state.categories[i].id !== action.payload.id){
                tempArr.push(state.categories[i])
               }
               else(tempArr.push(action.payload))
                
            }  
            return{
                ...state,
                categories: tempArr
            }  


        default:
            return state
    }
}

export default categoriesReducers