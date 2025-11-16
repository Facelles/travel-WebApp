import type { LoaderFunctionArgs } from "react-router";
import type { Route } from "./+types/create-trip";
import { getAllTrips, getTripById } from "~/appwrite/trips";
import { cn, getFirstWord, parseTripData } from "~/lib/utils";
import Header from "../../../components/Header";
import { InfoPill, TripCard } from "../../../components";
import { useSyncfusionComponent } from "~/hooks/useSyncfusionComponent";

export const loader = async ({ params }: LoaderFunctionArgs) => {
    const { tripId } = params;
    if (!tripId) {
        throw new Response("Trip ID is required", { status: 400 });
    }

    const trips = await getAllTrips(4, 0);

    const trip = await getTripById(tripId);

    return {
        trip: trip,
        allTrips: trips.allTrips.map((doc: any) => ({
            id: doc.$id,
            ...parseTripData(doc.tripDetail ?? doc.tripDetails),
            imageUrls: Array.isArray(doc.imageUrls) ? doc.imageUrls : [],
        })),
    };
};

const tripDetail = ({ loaderData }: Route.ComponentProps) => {
    // normalize incoming loader shape: tolerate trip.tripDetail or trip.tripDetails
    const tripDoc = loaderData?.trip ?? null;

    // try several possible field names for the stored trip payload
    const tripRaw =
        tripDoc?.tripDetail ??
        tripDoc?.tripDetails ??
        tripDoc?.tripDetailsJson ??
        loaderData?.tripDetail ??
        null;

    // parse into object (parseTripData can handle some formats)
    let tripData = null;
    if (tripRaw) {
        tripData = parseTripData(tripRaw) ?? null;
        if (!tripData && typeof tripRaw === "string") {
            try {
                tripData = JSON.parse(tripRaw);
            } catch (e) {
                console.warn("tripDetail is not valid JSON:", e);
                tripData = null;
            }
        }
    }

    const allTrips = (loaderData?.allTrips as Trip[]) ?? [];

    // imageUrls may be top-level on doc or inside tripData
    const imageUrls: string[] =
        (Array.isArray(tripDoc?.imageUrls) && tripDoc.imageUrls) ||
        (tripData?.imageUrls && Array.isArray(tripData.imageUrls)
            ? tripData.imageUrls
            : []) ||
        [];

    // normalize travelStyle: handle literal strings "undefined"/"null"
    const rawTravelStyle = (tripData?.travelStyle ??
        tripDoc?.travelStyle ??
        "") as string;
    const travelStyle =
        typeof rawTravelStyle === "string" &&
            ["", "undefined", "null"].includes(rawTravelStyle.trim().toLowerCase())
            ? ""
            : rawTravelStyle;

    const {
        name,
        duration,
        itinerary,
        groupType,
        interests,
        description,
        budget,
        estimatedPrice,
        bestTimeToVisit,
        weatherInfo,
        country,
    } = tripData || {};

    const pillItems = [
        { text: travelStyle, bg: "!bg-pink-50 !text-pink-500" },
        { text: groupType, bg: "!bg-primary-50 !text-primary-500" },
        { text: budget, bg: "!bg-success-50 !text-success-700" },
        { text: interests, bg: "!bg-navy-50 !text-navy-500" },
    ].filter((p) => {
        const t = String(p.text ?? "")
            .trim()
            .toLowerCase();
        return t !== "" && t !== "undefined" && t !== "null";
    });

    const visitTimeAndWeatherInfo = [
        { title: "Best time to Visit: ", items: bestTimeToVisit },
        { title: "Weather: ", items: weatherInfo },
    ];

    const components = useSyncfusionComponent(
        () => import("@syncfusion/ej2-react-buttons"),
        ["ChipListComponent", "ChipsDirective", "ChipDirective"]
    );

    if (!components) return null;
    const { ChipListComponent, ChipsDirective, ChipDirective } = components;

    console.log("Trip Data:", tripData);
    return (
        <main className="travel-detail wrapper">
            <Header
                title="Trip Details"
                descprition="View and edit AI-generated travel plans"
            />

            <section className="container wrapper-md">
                <header>
                    <h1 className="p-40-semibold text-dark-100">{name}</h1>
                    <div className="flex items-center gap-5">
                        <InfoPill
                            text={`${duration} day plan`}
                            image="/assets/icons/calendar.svg"
                        />
                        <InfoPill
                            text={`${itinerary
                                ?.slice(0, 4)
                                .map((item: any) => item.location)
                                .join(",")}`}
                            image="/assets/icons/location-mark.svg"
                        />
                    </div>
                </header>

                <section className="gallery">
                    {imageUrls.map((url: string, index: number) => (
                        <img
                            key={index}
                            src={url}
                            alt={`Trip image ${index + 1}`}
                            className={cn(
                                "w-full rounded-xl object-cover",
                                index === 0
                                    ? "md:col-span-2 md:row-span-2 h-[330px]"
                                    : "md:row-span-1 h-[150px]"
                            )}
                        />
                    ))}
                </section>

                <section className="flex gap-3 md:gap-5 items-center flex-wrap">
                    <ChipListComponent id="travel-chip">
                        <ChipsDirective>
                            {pillItems.map((pill, i) => (
                                <ChipDirective
                                    key={i}
                                    text={getFirstWord(pill.text || "")}
                                    cssClass={`${pill.bg} !text-base !font-medium !px-4`}
                                />
                            ))}
                        </ChipsDirective>
                    </ChipListComponent>

                    <ul className="flex gap-1 items-center">
                        {Array(5)
                            .fill("null")
                            .map((_, index) => (
                                <li key={index}>
                                    <img
                                        src="/assets/icons/star.svg"
                                        alt="star"
                                        className="size-[18px]"
                                    />
                                </li>
                            ))}
                        <li className="ml-1">
                            <ChipListComponent>
                                <ChipsDirective>
                                    <ChipDirective
                                        text="4.6/5"
                                        cssClass="!bg-yellow-50 !text-yellow-700 "
                                    />
                                </ChipsDirective>
                            </ChipListComponent>
                        </li>
                    </ul>
                </section>

                <section className="title">
                    <article>
                        <h3>
                            {duration}-Day {country} {travelStyle}
                        </h3>
                        <p>
                            {budget},{groupType} and {interests}
                        </p>
                    </article>

                    <h2>{estimatedPrice}</h2>
                </section>
                <p className="text-sm md:text-lg font-normal text-dark-400">
                    {description}
                </p>
                <ul className="itinerary">
                    {itinerary?.map((dayPlan: DayPlan, index: number) => (
                        <li key={index}>
                            <h3>
                                Day {dayPlan.day}: {dayPlan.location}
                            </h3>

                            <ul>
                                {dayPlan.activities.map((activity, index: number) => (
                                    <li key={index}>
                                        <span className="flex-shring-0 p-18-semibold">
                                            {activity.time}
                                        </span>
                                        <p className="flex-grow">{activity.description}</p>
                                    </li>
                                ))}
                            </ul>
                        </li>
                    ))}
                </ul>

                {visitTimeAndWeatherInfo.map((section) => (
                    <section key={section.title} className="visit">
                        <div>
                            <h3>{section.title}</h3>

                            <ul>
                                {section.items?.map((item: any) => (
                                    <li key={item}>
                                        <p className=" flex-grow ">{item}</p>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </section>
                ))}

                <section className="flex-col gap-6 w-full">
                    <h2 className="p-24-semibold text-dark-100">Popular Trips</h2>

                    <div className="trip-grid">
                        {allTrips.map((trip) => {
                            // safely get first image URL
                            const imageUrl = Array.isArray(trip.imageUrls) 
                                ? trip.imageUrls.find((url: string) => !!url)
                                : null;
                            
                            const tags = [trip.interests, trip.travelStyle].filter(
                                (tag) => tag && tag !== "undefined" && tag !== "null"
                            );

                            return (
                                <TripCard
                                    key={trip.id}
                                    id={trip.id}
                                    name={trip.name}
                                    location={trip.itinerary?.[0]?.location ?? ""}
                                    imageUrl={imageUrl || "/assets/images/trip-placeholder.jpg"}
                                    tags={tags}
                                    price={trip.estimatedPrice}
                                />
                            );
                        })}
                    </div>
                </section>
            </section>
        </main>
    );
};

export default tripDetail;
