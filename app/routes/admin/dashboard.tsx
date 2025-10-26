import { Header, StatsCard, TripCard } from "../../../components";
import { dashboardStats, user, allTrips } from "~/constants";
import { redirect } from "react-router";
import { getUser } from "~/appwrite/auth";
import type { Route } from './+types/dashboard';

const { totalUsers, usersJoined, totalTrips, tripsCreated, userRole } = dashboardStats;

export async function loader() {
  throw new Error("some error thrown in a loader");
};

export const clientLoader = async () => await getUser();

const Dashboard = ({ loaderData }: Route.ComponentProps) => {
  const user = loaderData as User | null;
  return (
    <main className="dashboard wrapper">
      <Header
        title={`Welcome back, ${user?.name || "User"} 👋`}
        descprition="Trakck your activity, trends and popular destinations"
      />

      <section className="flex flex-col gap-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 w-full">
          <StatsCard
            headerTitle="Total Users"
            total={totalUsers}
            currentMonthCount={usersJoined.currentMoth}
            lastMonthCount={usersJoined.lastMonth}
          />
          <StatsCard
            headerTitle="Total Trips"
            total={totalTrips}
            currentMonthCount={tripsCreated.currentMoth}
            lastMonthCount={tripsCreated.lastMonth}
          />
          <StatsCard
            headerTitle="Active Users"
            total={userRole.total}
            currentMonthCount={userRole.currentMoth}
            lastMonthCount={userRole.lastMonth}
          />
        </div>
      </section>
      <section className="container">
        <h1 className="text-xl font-semibold text-dark-100"> Created Trips</h1>

        <div className="trip-grid">
          {allTrips.slice(0, 4).map(({ id, name, imageUrls, itinerary, tags, estimatedPrice }) => (
            <TripCard
              key={id}
              id={id.toString()}
              name={name}
              imageUrl={imageUrls[0]}
              location={itinerary?.[0]?.location || 'Unknown'}
              tags={tags}
              price={estimatedPrice}
            />
          ))}
        </div>

      </section>
    </main>
  );
};

export default Dashboard;
