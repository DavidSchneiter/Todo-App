import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { setActiveNote} from '../../store/journal/journalSlice';
import { startDeletingNote, startUpdateState } from '../../store/journal/thunks';

import Swal from 'sweetalert2';
import 'sweetalert2/dist/sweetalert2.css';

export const ToDo = ({body, id, date, complete}) => {

	const {active:note} = useSelector( state => state.journal );
	
    const dispatch = useDispatch();
	
	const inputRef = useRef()
	const txtRef = useRef()

	const refe = () => {
		dispatch(setActiveNote({id, complete}));
		dispatch(startUpdateState())
		txtRef.current.classList.toggle('complete')
	}

	

    const onDelete = () => {
		dispatch( setActiveNote({body, id, date, complete}) );
		Swal.fire({
		  title: 'Are you sure?',
		  text: "You won't be able to revert this!",
		  icon: 'warning',
		  showCancelButton: true,
		  confirmButtonColor: '#3085d6',
		  cancelButtonColor: '#d33',
		  confirmButtonText: 'Yes, delete it!'
		}).then((result) => {
		  if (result.isConfirmed) {
			Swal.fire(
				'Deleted!',
				'Your file has been deleted.',
				'success',
				dispatch( startDeletingNote() )
			)
		  }
		})
    }


  return (
    <li className='todo__task'>
        <div class="container">
            <input 
				type="checkbox" 
				id="checkbox" 
				ref={inputRef}
				onClick={refe}
				checked={complete}

				
				/>
        </div>
        <p 
			ref={txtRef} 
			className={`${complete ? 'complete' : ''}`}
		> {body} </p>
        <button className='btn'
        onClick={onDelete}>X</button>
    </li>
  )
}
