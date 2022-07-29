import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { startLogout } from '../../store/auth/thunks';
import { startNewNote } from '../../store/journal/thunks';
import { JournalEntry } from './JournalEntry';

export const Sidebar = () => {

    const dispatch = useDispatch();
    const { displayName } = useSelector( state => state.auth );
    const { notes } = useSelector( state => state.journal );

    const onLogout = () => {
        dispatch( startLogout() );
    }

    const onClickNewNote = () => {
        dispatch( startNewNote() );
      }

  return (
    <aside className='journal__sidebar'>
        
        <div className='journal__sidebar-navbar'>
            <h3 className='mt-5'>
                <i className='far fa-moon'></i>
                <span>{displayName} </span>
            </h3>

            <button 
                className='btn'
                onClick={onLogout}
            >
                Logout
            </button>
        </div>

        <div 
            className='journal__new-entry'
            onClick={onClickNewNote}
        >
            <i className='far fa-calendar-plus fa-5x'></i>
            <p className='mt-5'>
                New Entry
            </p>
        </div>

        {
            notes.map( note => (
                <JournalEntry key={ note.id } { ...note } />
            ))
        }


    </aside>
  )
}
