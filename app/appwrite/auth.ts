import { OAuthProvider, Query } from "appwrite";
import { redirect } from "react-router";
import { account, database, appwriteConfig } from "~/appwrite/client";

export const loginWithGoogle = async () => {
    try {
        account.createOAuth2Session(
            OAuthProvider.Google,
        );
    } catch (error) {
        console.log('[loginWithGoogle] Error:', error);
    }
};

export const getUser = async () => {
    try {
        const user = await account.get();

        if (!user) return redirect('/sign-in');
        const { documents } = await database.listDocuments(
            appwriteConfig.databaseID!,
            appwriteConfig.userCollectionID!,
            [
                Query.equal('accountId', user.$id),
                Query.select(['name', 'email', 'imageUrl', 'joinedAt', 'accountId'])
            ]
        );
    } catch (error) {
        console.log('[getUser] Error:', error);
    };
};

export const logoutUser = async () => {
    try {

    } catch (error) {
        console.log('[logoutUser] Error:', error);
    }
};

export const getGooglePicture = async () => {
    try {

    } catch (error) {
        console.log('[getGooglePicture] Error:', error);
    }
};

export const storeUserData = async () => {
    try {

    } catch (error) {
        console.log('[storeUserData] Error:', error);
    }
};

export const getExisitingUser = async () => {
    try {

    } catch (error) {
        console.log('[getExisitingUser] Error:', error);
    }
};
