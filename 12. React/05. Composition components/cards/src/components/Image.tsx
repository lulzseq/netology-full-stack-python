import React from 'react'
import { IImage } from '../models/IImage'

const Image: React.FC<IImage> = (props) => {
  const { data } = props
  return (
    <div className='rectangle'>{data}</div>
  )
}

export default Image
