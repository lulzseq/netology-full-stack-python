export default function Clock({ onRemove, clockName, currentTime }) {
  return (
    <div className='clocks'>
      <div className='clock__item'>
        <div className='clock__btn'>
          <button className='btnDelete' onClick={onRemove}>✘</button>
        </div>
        <div className='clock__time'>
          <p>{clockName}</p>
          <p>{currentTime}</p>
        </div>
      </div>
    </div>
  )
}
