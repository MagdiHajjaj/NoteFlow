import React from 'react'
import NoteCard from './NoteCard'
import Loader from './Loader'

const NoteCardBox = ({notes, loading}) => {
    return (
        <div className="container">
            <div className="note-has-grid row">
                {loading  && <Loader loading ={loading} />}
                {notes.map(note =><NoteCard key={note.id} note = {note} />)}
               
                
                
            </div>
        </div>
    )
}

export default NoteCardBox