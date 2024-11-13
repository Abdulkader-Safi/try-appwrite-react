import { Models } from "appwrite";
import db from "../appwrite/databases";

type IProp = {
  setNotes: React.Dispatch<React.SetStateAction<Models.Document[]>>;
};

const NoteForm = ({ setNotes }: IProp) => {
  const handleAdd = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const noteBody = (e.target as HTMLFormElement).body.value;

    if (!noteBody) return;

    try {
      const payload = { body: noteBody };
      const response = await db.notes.create(payload);
      setNotes((prevNotes: Models.Document[]) => [response, ...prevNotes]);
      (e.target as HTMLFormElement).reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={handleAdd} id="todo-form">
      <input type="text" name="body" placeholder="🤔 What's on the agenda?" />
    </form>
  );
};

export default NoteForm;
