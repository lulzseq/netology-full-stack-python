import { useDispatch, useSelector } from "react-redux";
import { Row, List, Button } from "reactstrap"

const Items = () => {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.row.items);
  const filterText = useSelector((state) => state.row.filterText);

  const filteredItems = items.filter(
    (item) =>
      item[0].toLowerCase().includes(filterText.toLowerCase()) || 
      item[1].toString().includes(filterText)
  );

  const editHandler = (index) => {
    dispatch({
      type: 'SET_USER_TEXT',
      payload: items[index][0],
    });
    dispatch({
      type: 'SET_USER_PRICE',
      payload: items[index][1],
    });
    dispatch({
      type: 'SET_EDIT_MODE',
      payload: index,
    });
  };

  const removeHandler = (index) => {
    dispatch({
      type: 'REMOVE_ITEM',
      payload: index,
    });
  }

  return (
    <>
      <Row>
        <List>
          <ul className="items">
            {filteredItems.map((item, index) => (
              <li key={index} className="item">
                {item[0]}: {item[1]}
                <Button
                  color="secondary"
                  size="sm"
                  style={{ width: "30px" }}
                  outline
                  className="rowBtn"
                  onClick={() => editHandler(index)}
                >
                  ✎
                </Button>
                <Button
                  color="secondary"
                  size="sm"
                  style={{ width: "30px" }}
                  outline
                  className="rowBtn"
                  onClick={() => dispatch({ type: 'REMOVE_ITEM', payload: index })}
                >
                  x
                </Button>
              </li>
            ))}
          </ul>
        </List>
      </Row>
    </>
  )
}

export default Items;