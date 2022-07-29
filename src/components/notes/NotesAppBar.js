import React from 'react'
import { useEffect, useMemo, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';
import { useForm } from '../../hooks/useForm';
import { startSaveNote } from '../../store/journal/thunks';



export const NotesAppBar = () => {

	const dispatch = useDispatch();
    const { active:note, messageSaved, isSaving } = useSelector( state => state.journal );

    const { date } = useForm( note );

    const dateString = useMemo(() => {
        const newDate = new Date( date );
        return newDate.toUTCString();
    }, [date])

    const fileInputRef = useRef();


    useEffect(() => {
      if ( messageSaved.length > 0 ) {
          Swal.fire('Nota actualizada', messageSaved, 'success');
      }
    }, [messageSaved])
    
    

    const onSaveNote = () => {
        dispatch( startSaveNote() );
    }

    // const onFileInputChange = ({ target }) => {
    //     if( target.files === 0 ) return;
    //     dispatch( startUploadingFiles( target.files ) );
    // }


	return (
		<div className='notes__appbar'>
			<span>{ dateString }</span>

			{/* <input
				type="file"
				multiple
				ref={ fileInputRef }
				onChange={ onFileInputChange }
				style={{ display: 'none' }}
			/> */}

			<div>
				<button 
					className='btn'
					disabled={ isSaving }
                    onClick={ () => fileInputRef.current.click() }
					>
					Picture
				</button>

				<button 
					className='btn'
					disabled={ isSaving }
                    onClick={ onSaveNote }
				>
					Save
				</button>
			</div>
		</div>
	)
	}
