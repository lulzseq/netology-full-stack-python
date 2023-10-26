const initialState = {
  userText: '',
  userPrice: 0,
  items: [],
  isEditing: -1,
  filterText: ''
};

const rowReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_ROW':
      if (state.isEditing === -1) {
        return {
          ...state,
          items: [...state.items, [action.payload.userText, action.payload.userPrice]],
          userText: '',
          userPrice: 0,
        };
      } else {
        const updatedItems = [...state.items];
        updatedItems[state.isEditing] = [action.payload.userText, action.payload.userPrice];
        return {
          ...state,
          items: updatedItems,
          userText: '',
          userPrice: 0,
          isEditing: -1,
        };
      }
    case 'REMOVE_ITEM':
      return {
        ...state,
        items: state.items.filter((item, index) => index !== action.payload),
      }
    case 'SET_USER_TEXT':
      return { ...state, userText: action.payload };
    case 'SET_USER_PRICE':
      return { ...state, userPrice: action.payload };
    case 'SET_EDIT_MODE':
      return { ...state, isEditing: action.payload };
    case 'SET_FILTER_TEXT':
      return { ...state, filterText: action.payload };
    default:
      return state;
  }
};

export default rowReducer;
