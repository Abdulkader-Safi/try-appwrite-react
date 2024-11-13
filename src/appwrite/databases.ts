import { collection_note_id, database_id } from "../constants"
import { databases } from "./config"
import { ID, Models } from "appwrite"

interface CollectionMethods {
	create: (
		payload: Partial<Omit<Document, keyof Models.Document>>,
		permissions?: string[],
		id?: string
	) => Promise<Models.Document>
	update: (
		id: string,
		payload: Partial<Omit<Document, keyof Models.Document>>,
		permissions?: string[]
	) => Promise<Models.Document>
	delete: (id: string) => Promise<void>
	list: (queries?: string[]) => Promise<Models.DocumentList<Models.Document>>
	get: (id: string) => Promise<Models.Document>
}

const collections = [
	{
		dbId: database_id,
		id: collection_note_id,
		name: "notes",
	},
]

const db: { [key: string]: CollectionMethods } = {}

collections.forEach((col) => {
	db[col.name] = {
		create: (
			payload: Partial<Omit<Document, keyof Models.Document>>,
			permissions?: string[],
			id = ID.unique()
		) => databases.createDocument(col.dbId, col.id, id, payload, permissions),
		update: (
			id: string,
			payload: Partial<Omit<Document, keyof Models.Document>>,
			permissions?: string[]
		) => databases.updateDocument(col.dbId, col.id, id, payload, permissions),
		delete: async (id: string) => {
			await databases.deleteDocument(col.dbId, col.id, id)
		},

		list: (queries = []) => databases.listDocuments(col.dbId, col.id, queries),

		get: (id: string) => databases.getDocument(col.dbId, col.id, id),
	}
})

export default db
