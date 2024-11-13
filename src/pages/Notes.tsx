import { useEffect, useState } from "react"
import db from "../appwrite/databases"
import { Models, Query } from "appwrite"
import NoteForm from "../components/NoteForm"
import Note from "../components/Note"

export const Notes = () => {
	const [notes, setNotes] = useState<Models.Document[]>([])

	useEffect(() => {
		init()
	}, [])

	const init = async () => {
		const response = await db.notes.list([Query.orderDesc("$createdAt")])

		setNotes(response.documents)
	}

	return (
		<>
			<div>
				<h1>✍️ My Todo List</h1>
			</div>

			<NoteForm setNotes={setNotes} />

			<div>
				{notes.map((note) => (
					<Note key={note.$id} setNotes={setNotes} noteData={note} />
				))}
			</div>
		</>
	)
}
