/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useForm } from '../../hooks/useForm';
import { setActiveNote } from '../../store/journal/journalSlice';
import { startDeletingNote } from '../../store/journal/thunks';


import { NotesAppBar } from './NotesAppBar'


export const NoteScreen = () => {

    const dispatch = useDispatch();
    const { active:note} = useSelector( state => state.journal );

    const { body, title, onInputChange, formState } = useForm( note );



    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState])

    

    const onDelete = () => {
        dispatch( startDeletingNote() );
    }
    

  return (
    <div className='notes__main-content'>
        <NotesAppBar />

        <div className='notes__content'>
            
            <input 
                type="text"
                placeholder="Some awesome title"
                className='notes__title-input'
                autoComplete='off'
                name='title'
                value={title}
                onChange={onInputChange}
            />
            <textarea
                placeholder='What happened today'
                className='notes__textarea'
                name='body'
                value={body}
                onChange={onInputChange}
            >
            </textarea>
            {/* {
                (note.url)
                && (
                    <div className='notes__image'>
                        <img
                            src={note.url}
                            alt='imagen'
                        />
                    </div>
                    )
            } */}
        </div>

            <button 
                className='btn btn-danger'
                onClick={onDelete} 
            >
                Delete
            </button>

    </div>
  )
}
