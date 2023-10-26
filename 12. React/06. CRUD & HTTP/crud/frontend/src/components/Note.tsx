function Note({ onRemove, content }) {
  return (
    <>
      <div className='note'>
        <div className="note__content">{content}</div>
        <button className='note__button-remove' onClick={onRemove}>✘</button>
      </div>
    </>
  );
}

export default Note;
