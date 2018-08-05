
const initialState = {
   colors: ['#ffa500','#ad7f10' , '#482e74', '#60b4e5', '#2E3A87', '#1D976C'],
   color: 'orange',
   shadowColor: 'gray',
   selected: 0,
   checked: false
}

const reducer = (state = initialState, action) => {
   if (action.type === 'CHANGE_SELECTED') {
      return {
         ...state,
         color: state.colors[action.value],
         shadowColor: state.colors[action.value]
      }
   }
   if (action.type === 'RESET') {
      return {
         ...state,
         color: 'orange',
         shadowColor: 'gray'
      }
   }
   if (action.type === 'CHECKED') {
      return {
         ...state,
         checked: !state.checked
      }
   }
   if (action.type === 'CHANGE_COLOR') {
      return {
         ...state,
         color: action.value,
         shadowColor: action.value
      }
   }

   return state;
}


export default reducer;