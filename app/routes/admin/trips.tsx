import { parseTripData } from "~/lib/utils";
import { Header } from "../../../components";
import type { Route } from "./+types/trips";
import { getAllTrips } from "~/appwrite/trips";
import { useSearchParams, type LoaderFunctionArgs } from "react-router";
import { useSyncfusionComponent } from "~/hooks/useSyncfusionComponent";
import { TripCard } from "../../../components";
import { useState } from "react";



export const loader = async ({ request }: LoaderFunctionArgs) => {
  const limit = 8;
  const url = new URL(request.url);
  const page = parseInt(url.searchParams.get('page') || "1", 10);
  const offset = (page - 1) * limit;

  const { allTrips, total } = await getAllTrips(limit, offset);

  return {
    Trips: allTrips.map((trip) => ({
      id: trip.$id,
      ...parseTripData(trip.tripDetail),
      imageUrls: Array.isArray(trip.imageUrls) ? trip.imageUrls : [],
    })),
    total,
  };
};

const Trips = ({ loaderData }: Route.ComponentProps) => {

  const gridComponents = useSyncfusionComponent(
    () => import("@syncfusion/ej2-react-grids"),
    ["PagerComponent"]
  );

  const  [searchParams] = useSearchParams();
  const initialPage = parseInt(searchParams.get("page") || "1");

  const [currentPage, setCurrentPage] = useState(initialPage);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.location.search = `?page=${newPage}`;
  };

  const Trips = loaderData.Trips as Trip[] | [];
  if (!gridComponents) return null;
  const { PagerComponent } = gridComponents;
  return (
    <main className='all-users wrapper'>
      <Header
        title="Trips"
        descprition="View and edit AI-generated t ravel plans"
        ctaText="Create a trip"
        ctaUrl="/trips/create"
      />

      <section>
        <h1 className="p-24-semibold text-dark-100 mb-4"> Manage Created Trips</h1>


        <div className="trip-grid mb-4">
          {Trips.map((trip: any) => {
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


        <PagerComponent
        totalRecordsCount={loaderData.total}
        pageSize={8}
        currentPage={currentPage}
        click={(args: any) => handlePageChange(args.currentPage)}
        cssClass="!mb-4"
        />
      </section>

    </main>
  )
}

export default Trips;