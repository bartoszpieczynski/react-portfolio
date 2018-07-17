
const initialState = {
   colors: ['orange', '#482e74', 'orange', 'red', 'yellow'],
   selected: 0
}

const reducer = (state = initialState, action) => {
   if (action.type === 'CHANGE_SELECTED') {
      return {
         ...state,
         selected: action.value
      }
   }
   if (action.type === 'RESET') {
      return {
         ...state,
         selected: 0
      }
   }

   return state;
}


export default reducer;