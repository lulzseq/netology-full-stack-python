const addItem = (row) => {
  return {
    type: 'ADD_ROW',
    payload: row,
  }
}

export default addItem;