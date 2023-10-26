import React from 'react'
import Text from './Text'

export default function CardBody() {
  return (
    <div className="card-body">
      <h5 className="card-title">Card title</h5>
      <Text data={['text #1', 'text #2', 'text #3']} />
      <a href="#" className="btn btn-primary">Press</a>
    </div>
  )
}
