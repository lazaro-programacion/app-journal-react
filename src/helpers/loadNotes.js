import { db } from "../firebase/firebase-config"


export const loadNotes = async (uid) => {

    // console.log(uid)

    const notesSnap = await db.collection(`${uid}/journal/notes/`).orderBy('date', 'desc').get();

    const notes = [];

    // console.log(notesSnap)

    notesSnap.forEach(doc => {
        notes.push({
            id: doc.id,
            ...doc.data()
        })
    })

    //console.log(notes)

    return notes;
}

