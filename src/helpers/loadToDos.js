import { collection, getDocs } from "firebase/firestore/lite";
import { FirebaseDB } from "../firebase/config";

export const loadToDos = async (uid = "") => {
  if (!uid) throw new Error("El UID del usuario no existe");

  const collectionRef = collection(FirebaseDB, `${uid}/ToDo/ToDoList/`);
  const docs = await getDocs(collectionRef);

  const ToDos = [];
  docs.forEach((doc) => {
    ToDos.push({ id: doc.id, ...doc.data() });
  });

  return ToDos.sort((a, b) => {
    if (a.complete) {
      return 1;
    } else {
      return -1;
    }
  });
};
