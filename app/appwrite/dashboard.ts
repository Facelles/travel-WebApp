import { parseTripData } from "~/lib/utils";
import { database, appwriteConfig } from "./client";

interface Document {
    [key: string]: any;
}

type FilterByDate = (
    items: Document[],
    key: string,
    start: string,
    end?: string
) => number;

export const getUsersAndTripsStats = async (): Promise<DashboardStats> => {
    const d = new Date();
    const startCurrent = new Date(d.getFullYear(), d.getMonth(), 1).toISOString();
    const startPrev = new Date(d.getFullYear(), d.getMonth() -1, 1).toISOString();
    const endPrev = new Date(d.getFullYear(), d.getMonth(), 0).toISOString();

    const [users, trips] = await Promise.all([
        database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.userCollectionID
        ),
        database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.tripCollectionID
        ),
    ])

    const filterByDate: FilterByDate = (items, key, start, end) => items.filter((item) => (
        item[key] >= start && (!end || item[key] <= end)
    )).length;

    const filterUsersByRole = (role: string) => {
        return users.documents.filter((u: Document) => u.status === role)
    }

    return {
        totalUsers: users.total,
        usersJoined: {
            currentMonth: filterByDate(
                users.documents,
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                users.documents,
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        userRole: {
            total: filterUsersByRole('user').length,
            currentMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        },
        totalTrips: trips.total,
        tripsCreated: {
            currentMonth: filterByDate(
                trips.documents,
                'createdAt',
                startCurrent,
                undefined
            ),
            lastMonth: filterByDate(
                filterUsersByRole('user'),
                'joinedAt',
                startPrev,
                endPrev
            )
        },
    }
}

export const getUserGrowthPerDay = async () => {
    const users = await database.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.userCollectionID
    );

    const userGrowth = users.documents.reduce(
        (acc: { [key: string]: number }, user: Document) => {
            const date = new Date(user.joinedAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(userGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsCreatedPerDay = async () => {
    const trips = await database.listDocuments(
        appwriteConfig.databaseID,
        appwriteConfig.tripCollectionID
    );

    const tripsGrowth = trips.documents.reduce(
        (acc: { [key: string]: number }, trip: Document) => {
            const date = new Date(trip.createdAt);
            const day = date.toLocaleDateString("en-US", {
                month: "short",
                day: "numeric",
            });
            acc[day] = (acc[day] || 0) + 1;
            return acc;
        },
        {}
    );

    return Object.entries(tripsGrowth).map(([day, count]) => ({
        count: Number(count),
        day,
    }));
};

export const getTripsByTravelStyle = async () => {
    try {
        const trips = await database.listDocuments(
            appwriteConfig.databaseID,
            appwriteConfig.tripCollectionID
        );

        const travelStyleCount: { [key: string]: number } = {};

        trips.documents.forEach((trip: any) => {
            try {
                const tripData = parseTripData(trip.tripDetail);
                if (tripData && tripData.travelStyle) {
                    travelStyleCount[tripData.travelStyle] = (travelStyleCount[tripData.travelStyle] || 0) + 1;
                }
            } catch (e) {
                console.warn("Failed to parse trip:", e);
            }
        });

        const result = Object.entries(travelStyleCount).map(([travelStyle, count]) => ({
            travelStyle,
            count
        }));

        return result;
    } catch (error) {
        console.error("Error fetching trips by travel style:", error);
        return [];
    }
};