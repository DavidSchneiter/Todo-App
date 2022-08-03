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
import { loadToDos } from "../../helpers/loadToDos";
import {
  addNewEmptyToDo,
  deleteToDoById,
  setActiveToDo,
  setClearToDo,
  setToDos,
  setSaving,
  updateToDo,
  deleteTodoCompleted,
} from "./toDoSlice";

export const startLoadingToDos = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    if (!uid) throw new Error("El UID del usuario no existe");

    const ToDos = await loadToDos(uid);
    dispatch(setToDos(ToDos));
  };
};

export const startSaveToDo = () => {
  return async (dispatch, getState) => {
    // dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: ToDo } = getState().todo;

    const newToDo = {
      body: ToDo.body,
      date: new Date().getTime(),
      complete: false,
    };

    const newDoc = doc(collection(FirebaseDB, `${uid}/ToDo/ToDoList`));
    newToDo.id = newDoc.id;
    await setDoc(newDoc, newToDo);

    // const noteToFireStore = { ...note };
    // delete noteToFireStore.id;

    // const docRef = doc( FirebaseDB, `${ uid }/journal/notes/${ note.id }` );
    // await setDoc( docRef, noteToFireStore, { merge: true });
    dispatch(addNewEmptyToDo(newToDo));

    dispatch(updateToDo(newToDo));
    const clearToDo = {
      body: "",
    };
    dispatch(setClearToDo(clearToDo));
  };
};

export const startUpdateState = () => {
  return async (dispatch, getState) => {
    dispatch(setSaving());

    const { uid } = getState().auth;
    const { active: ToDo } = getState().todo;

    const newToDo = {
      complete: !ToDo.complete,
    };

    const docRef = doc(FirebaseDB, `${uid}/ToDo/ToDoList/${ToDo.id}`);
    await setDoc(docRef, newToDo, { merge: true });

    dispatch(updateToDo(newToDo));
    dispatch(startLoadingToDos());
  };
};

export const startDeletingToDo = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: ToDo } = getState().todo;

    const docRef = doc(FirebaseDB, `${uid}/ToDo/ToDoList/${ToDo.id}`);
    await deleteDoc(docRef);

    dispatch(deleteToDoById(ToDo.id));
  };
};
export const startDeletingCompleted = () => {
  return async (dispatch, getState) => {
    const { uid } = getState().auth;
    const { active: ToDo } = getState().todo;

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
        collection(FirebaseDB, `${uid}/ToDo/ToDoList`)
      );

      const docsToRemove = snapshot.docs.filter(
        (doc) => doc.data().complete
      ).length;
      if (numDeleted >= docsToRemove) {
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
    deleteQueryBatch(FirebaseDB, 0, () => {});
    dispatch(deleteTodoCompleted(ToDo.complete));
  };
};
