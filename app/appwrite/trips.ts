import { Query } from 'appwrite';
import { appwriteConfig, database } from '../appwrite/client';

export const getAllTrips = async (limit: number, offset: number) => {
    const allTrips = await database.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.tripCollectionID,
        [Query.limit(limit), Query.offset(offset), Query.orderDesc('createdAt')]
    );


    if (allTrips.total === 0) {
        console.error("No trips found.");
        return { allTrips: [], total: 0 };
    }

    return { allTrips: allTrips.documents, total: allTrips.total };
};

export const getTripById = async (tripId: string) => {
    try {
        const trip = await database.getDocument(
            appwriteConfig.databaseID,
            appwriteConfig.tripCollectionID,
            tripId
        );
        if (!trip) {
            console.error("Trip not found with ID:", tripId);
            return null;
        }

        return trip;
    }
    catch {
        console.error("Trip not found with ID:", tripId);
        return { trip: null, total: 0 }
    }
}   