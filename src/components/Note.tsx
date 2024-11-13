import { Models } from "appwrite";
import { useState } from "react";
import db from "../appwrite/databases";
import DeleteIcon from "../assets/DeleteIcon";

type IProp = {
  noteData: Models.Document;
  setNotes: React.Dispatch<React.SetStateAction<Models.Document[]>>;
};

const Note = ({ noteData, setNotes }: IProp) => {
  const [note, setNote] = useState<Models.Document>(noteData);

  const handleUpdate = async () => {
    const completed = !note.completed;
    await db.notes.update(note.$id, { completed });
    setNote((prevNote: Models.Document) => ({ ...prevNote, completed }));
  };
  const handleDelete = async () => {
    await db.notes.delete(note.$id);
    setNotes((prevState: Models.Document[]) =>
      prevState.filter((i) => i.$id !== note.$id),
    );
  };

  return (
    <div className="note-wrapper">
      <span className="note-body" onClick={handleUpdate}>
        {note.completed ? <s>{note.body}</s> : <>{note.body}</>}
      </span>

      <div onClick={handleDelete}>
        <DeleteIcon />
      </div>
    </div>
  );
};

export default Note;
