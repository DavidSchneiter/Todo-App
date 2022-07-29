/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect} from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from '../../hooks/useForm'
import { setActiveNote } from '../../store/journal/journalSlice'
import { startNewNote, startSaveNote } from '../../store/journal/thunks'

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const Input = () => {
    
	const dispatch = useDispatch();

	const { active:note, messageSaved, isSaving, notes} = useSelector( state => state.journal );

	const { body, onInputChange, formState } = useForm( note );

    useEffect(() => {
        dispatch( setActiveNote(formState) );
    }, [formState])

	// const onClickNewNote = () => {
    //     dispatch( startNewNote() );
    //   }
	// const habilitar = () => {
	// 	return(inputRef.current.disabled = false)
	// }

    const onSaveNote = () => {
        dispatch( startSaveNote() )
    }

    // useEffect(() => {
    //     if ( messageSaved.length > 0 ) {
    //         // Swal.fire('Successfully added', messageSaved, 'success');
    //         Swal.fire({
    //             icon: 'success',
    //             title: messageSaved,
    //           })
    //     }
    //     dispatch( setActiveNote(formState))
    // }, [messageSaved])

  	return (
    <>
        <div className='input__block'>
            
            <input 
                className='input'
                placeholder='Create New To Do'
                value={body}
                name="body"
                onChange={onInputChange}
                
            />
            <button 
            className='btn'
            disabled={isSaving}
            onClick={onSaveNote}
            >
                <i className="fa-solid fa-floppy-disk"></i>
            </button>
        </div>
    </>
  )
}
