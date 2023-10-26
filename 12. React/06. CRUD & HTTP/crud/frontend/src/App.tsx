import { useEffect, useState } from 'react';
import './App.css';
import Note from './components/Note';

function App() {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

  useEffect(() => {
    fetchNotes();
  }, []);

  const fetchNotes = async () => {
    try {
      const response = await fetch(import.meta.env.VITE__NOTES_URL);
      const notes = await response.json();
      setNotes(notes);
    } catch (error) {
      console.log(error);
    }
  };

  const handleAddNote = async () => {
    if (newNote.trim() !== '') {
      const newId = notes.length > 0 ? notes[notes.length - 1].id + 1 : 0;

      await fetch(import.meta.env.VITE__NOTES_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id: newId, content: newNote }),
      });

      setNewNote('');

      fetchNotes();
    }
  };

  const handleRemoveNote = async (id: number) => {
    await fetch(import.meta.env.VITE__NOTES_URL + '/' + id, {
      method: 'DELETE',
    });
    fetchNotes();
  }


  return (
    <>
      <div className='nav'>
        <h1>Notes</h1>
        <button className="update"><img src="https://img.icons8.com/ios/50/connection-sync.png" width={40} height={40} title="Update" onClick={(e) => fetchNotes()} /></button>
      </div>
      <div className='notes'>
        {notes && notes.map((note) => <Note key={note.id} content={note.content} onRemove={() => handleRemoveNote(note.id)} />)}
      </div>
      <div className='new-note'>
        <textarea
          type="text"
          id='new-note'
          value={newNote}
          placeholder='New Note'
          onChange={(e) => setNewNote(e.target.value)}
        />
        <button className='button-new-note' onClick={handleAddNote}>Add Note</button>
      </div>
    </>
  );
}

export default App;
