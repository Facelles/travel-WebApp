import { Client, Account, Databases, Storage } from "appwrite";

export const appwriteConfig = {
    endpointUrl: process.env.VITE_APPWRITE_ENDPOINT,
    projectID: process.env.VITE_APPWRITE_PROJECT_ID,
    apiKey: process.env.VITE_APPWRITE_API_KEY,
    databaseID: process.env.VITE_APPWRITE_DATABASE_ID,
    userCollectionID: process.env.VITE_APPWRITE_USERS_COLLECTION_ID,
    tripCollectionID: process.env.VITE_APPWRITE_TRIPS_COLLECTION_ID,
}

const client =  new Client()
    .setEndpoint(appwriteConfig.endpointUrl!)
    .setProject(appwriteConfig.projectID!);


 const account = new Account(client);
 const database = new Databases(client);
 const storage = new Storage(client);

export { client, account, database, storage };