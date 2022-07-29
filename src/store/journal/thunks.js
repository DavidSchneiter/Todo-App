import { async } from "@firebase/util";
import {
  collection,
  deleteDoc,
  doc,
  getDocs,
  setDoc,
  writeBatch,
} from "firebase/firestore/lite";
import { FirebaseDB } from "../../firebase/config";
// import { fileUpload } from '../../helpers/fileUpload';
import { loadNotes } from "../../helpers/loadNotes";
import {
  addNewEmptyNote,
  deleteNoteById,
  deleteTodoCompleted,
  savingNewNote,
  setActiveNote,
  setNotes,
  setSaving,
  updateNote,
} from "./journalSlice";

export const startNewNote = () => {
  return async (dispatch, getState) => {
    // dispatch( savingNewNote() );

    const { uid } = getState().auth;

    const newNote = {
      // title: '',
      body: "",
      date: new Date().getTime(),
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    await setDoc(newDoc, newNote);

    newNote.id = newDoc.id;

    //! dispatch
    dispatch(addNewEmptyNote(newNote));
    dispatch(setActiveNote(newNote));
  };
};

export const startLoadingNotes = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const notes = await loadNotes(uid);
    dispatch(setNotes(notes));
  };
};

export const startSaveNote = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const newNote = {
      body: note.body,
      date: new Date().getTime(),
      complete: false,
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/journal/notes`));
    newNote.id = newDoc.id;
    await setDoc(newDoc, newNote);

    // const noteToFireStore = { ...note };
    // delete noteToFireStore.id;

    // const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
    // await setDoc( docRef, noteToFireStore, { merge: true });
    dispatch(addNewEmptyNote(newNote));

    dispatch(updateNote(newNote));
  };
};

export const startUpdateState = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const newNote = {
      complete: !note.complete,
    };

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await setDoc(docRef, newNote, { merge: true });

    dispatch(updateNote(newNote));
    dispatch(startLoadingNotes());
  };
};

// export const startUploadingFiles = ( files = [] ) => {
//     return async( dispatch ) => {
//         dispatch( setSaving() );

//         // await fileUpload( files[0] );
//         const fileUploadPromises = [];
//         for ( const file of files ) {
//             fileUploadPromises.push( fileUpload( file ) )
//         }

//         const photosUrls = await Promise.all( fileUploadPromises );

//         dispatch( setPhotosToActiveNote( photosUrls ));

//     }
// }

export const startDeletingNote = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: note } = getState().journal;

    const docRef = doc(FirebaseDB, `${uid}/journal/notes/${note.id}`);
    await deleteDoc(docRef);

    dispatch(deleteNoteById(note.id));
  };
};
export const startDeletingCompleted = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;

    // const querySnapshot = await getDocs(
    //   collection(FirebaseDB, `${uid}/journal/notes`)
    // );
    // console.log(
    //   "🚀 ~ file: thunks.js ~ line 139 ~ return ~ querySnapshot",
    //   querySnapshot.docs
    // );
    // querySnapshot.docs.forEach(async (doc) => {
    //   if (doc.data().complete) {
    //     console.log(doc.id, doc.data());
    //     const docRef = doc(FirebaseDB, `${uid}/journal/notes/${doc.id}`);
    //     await deleteDoc(docRef);
    //   }
    // });
    // console.log(querySnapshot)
    // dispatch( deleteTodoCompleted(notes.complete) );
    async function deleteQueryBatch(FirebaseDB, numDeleted, resolve) {
      const snapshot = await getDocs(
        collection(FirebaseDB, `${uid}/journal/notes`)
      );

      const docsToRemove = snapshot.docs.filter(
        (doc) => doc.data().complete
      ).length;
      if (numDeleted > docsToRemove) {
        // When there are no documents left, we are done
        resolve();
        return;
      }

      // Delete documents in a batch
      const batch = writeBatch(FirebaseDB);
      snapshot.docs.forEach((doc) => {
        if (doc.data().complete) {
          batch.delete(doc.ref);
          numDeleted += 1;
        }
      });

      await batch.commit();

      // Recurse on the next process tick, to avoid
      // exploding the stack.
      setTimeout(() => {
        deleteQueryBatch(FirebaseDB, numDeleted, resolve);
      }, 0);
    }
    deleteQueryBatch(FirebaseDB, 0, () => console.log("tuvi"));
    dispatch(startLoadingNotes());
  };
};
