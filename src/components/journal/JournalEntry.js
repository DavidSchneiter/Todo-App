import React from 'react'
import { useMemo } from 'react'
import { useDispatch } from 'react-redux'
import { setActiveNote } from '../../store/journal/journalSlice';



export const JournalEntry = ({ title = '', body, id, date, imageUrls = [] }) => {

    const dispatch = useDispatch();
    
    const onClickNote = () => {
        dispatch( setActiveNote({ title, body, id, date, imageUrls }) )
    }

    const newTitle = useMemo( () => {
        return title.length > 17
            ? title.substring(0,17) + '...'
            : title;
    },[ title ])

  return (
    <div 
        className='journal__entry pointer'
        onClick={onClickNote}
    >

        <div 
            className='journal__entry-body'
        >
            <p className='journal__entry-title'>
                {newTitle}
            </p>
            <p className='journal__entry-content'>
                {body}
            </p>
        </div>

        {/* <div className='journal__entry-date-box'>
            <span>{noteDate.format('dddd')}</span>
            <h4>{noteDate.format('Do')}</h4>
        </div> */}
    </div>
  )
}
