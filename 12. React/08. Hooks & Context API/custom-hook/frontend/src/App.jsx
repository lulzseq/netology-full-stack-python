import { useState } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Row, Col, Alert } from 'reactstrap';
import { useJsonFetch } from './hooks/useJsonFetch'

function App() {

  const sendRequest = (query) => {
    const host = 'http://localhost:7070/'
    return (query == 'loading') ? JSON.stringify(useJsonFetch(`${host}${query}`).loading) : JSON.stringify(useJsonFetch(`${host}${query}`).data);
  }

  return (
    <>
      <Row>

        <Col className='column'>
          <p>Get data</p>
          <Alert className='response'>{sendRequest('data')}</Alert>
        </Col>

        <Col className='column'>
          <p>Get error</p>
          <Alert color='danger' className='response'>{sendRequest('error')}</Alert>
        </Col>

        <Col className='column'>
          <p>Loading</p>
          <Alert color='secondary' className='response'>{sendRequest('loading')}</Alert>
        </Col>

      </Row>
    </>
  )
}

export default App
