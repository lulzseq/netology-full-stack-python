import './App.css'
import { useDispatch, useSelector } from "react-redux";
import addItem from "./redux/addItem";
import { Button, Col, Form, Input, Row } from "reactstrap";
import Items from './components/Items';

function App() {
  const dispatch = useDispatch();
  const { userText, userPrice } = useSelector((state) => state.row);


  const submitHandler = (e) => {
    e.preventDefault();
  
    dispatch({
      type: 'ADD_ROW',
      payload: {
        userText,
        userPrice,
      },
    });
  
    cancelHandler();
  };
  

  const cancelHandler = () => {
    dispatch({
      type: 'SET_USER_TEXT',
      payload: '',
    });
    dispatch({
      type: 'SET_USER_PRICE',
      payload: 0,
    });
  }

  return (
    <>
      <Form onSubmit={submitHandler}>
        <Row className="row-cols-lg-auto g-3 align-items-center">
          <Col>
            <Input
              id="text"
              name="text"
              placeholder="text"
              type="text"
              value={userText}
              onChange={(e) => {
                dispatch({
                  type: 'SET_USER_TEXT',
                  payload: e.target.value,
                });
              }}
            />
          </Col>
          <Col>
            <Input
              id="price"
              placeholder="price"
              type="number"
              value={userPrice}
              onChange={(e) => {
                dispatch({
                  type: 'SET_USER_PRICE',
                  payload: e.target.value,
                });
              }}
              required
            />
          </Col>
          <Col>
            <Button color="primary" type="submit">
              Save
            </Button>
          </Col>
          <Col>
            <Button color="secondary" onClick={cancelHandler}>
              Cancel
            </Button>
          </Col>
        </Row>
      </Form>
      <Items />
    </>
  )
}

export default App
