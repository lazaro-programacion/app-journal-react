import React, { useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { NotesAppBar } from './NotesAppBar'
import { useForm } from '../../hooks/useForm'
import { activeNote, startDeleting } from '../../actions/notes'

export const NoteScreen = () => {

    const dispatch = useDispatch()

    const { active: note } = useSelector(state => state.notes)

    const [formValues, handelInputChange, reset] = useForm(note)

    const { body, title, date, id } = formValues
    const activeId = useRef(note.id)

    useEffect(() => {
        if (note.id !== activeId.current) {
            reset(note)
            activeId.current = note.id
        }
    }, [note, reset])

    useEffect(() => {
        dispatch(activeNote( formValues.id, {...formValues}))
    }, [dispatch, formValues])

    const handelDeleteClick = () => {
        dispatch(startDeleting( id ))
    }

    return (
        <div className="notes__main-content">
            <NotesAppBar date={date} />

            <div className="notes__content">
                <input
                    type="text "
                    placeholder='Some awesome title'
                    className="notes__title-input"
                    autoComplete='off'
                    name='title'
                    value={title}
                    onChange={handelInputChange}
                />

                <textarea
                    placeholder='what happenend today'
                    className="notes__textarea"
                    name='body'
                    value={body}
                    onChange={handelInputChange}

                />
                {
                    note.url &&
                    <div className="notes__image">
                        <img src={note.url} alt="leon" />
                    </div>

                }
            </div>

                <button className="btn-danger" onClick={handelDeleteClick}> 
                delete
                 </button>



        </div>
    )
}
