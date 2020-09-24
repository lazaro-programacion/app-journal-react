import React from 'react'
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux'
import { startSaveNote, startUploading } from '../../actions/notes'


export const NotesAppBar = ({ date }) => {

    const dispatch = useDispatch()

    const noteDate = moment(date)

    const { active } = useSelector(state => state.notes)

    const handelSave = () => {
        dispatch(startSaveNote(active))

    }

    const handelPictureClick = () => {
        document.querySelector('#fileSelector').click()
    }

    const handelFileChange = (e) => {
            const file = e.target.files[0]
                if (file) {
                    dispatch(startUploading( file ))
                }
    }

    return (
        <div className="notes__appbar">
            <span>{noteDate.format("Do MMM YY")}</span>

            <input id='fileSelector' type="file" name='file' style={{ display: 'none' }} onChange={handelFileChange} />
            <div>

                <button
                    className="btn"
                    onClick={handelPictureClick}
                >
                    Picture
            </button>

                <button className="btn" onClick={handelSave}>
                    Save
            </button>

            </div>


        </div>
    )
}
