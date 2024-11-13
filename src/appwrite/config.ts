import { Client, Databases } from "appwrite";
import { endpoint, project_id } from "../constants";

const client = new Client();

client.setEndpoint(endpoint).setProject(project_id);

const databases = new Databases(client);

export { client, databases };
