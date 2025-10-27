import { useState, useEffect } from "react";
import { Header } from "../../../components";
import { cn, formatDate } from "~/lib/utils";
import { getAllUsers } from "~/appwrite/auth";
import type { Route } from "./+types/all-users";

 
export const loader = async () => {
  const { users, total } = await getAllUsers(10,0);

  return { users, total }
}

const Allusers = ({loaderData}: Route.ComponentProps) => {
  const [GridComponent, setGridComponent] = useState<any>(null)
  const [ColumnsDirective, setColumnsDirective] = useState<any>(null)
  const [ColumnDirective, setColumnDirective] = useState<any>(null)

  const { users } = loaderData;


  useEffect(() => {
    import("@syncfusion/ej2-react-grids").then((pkg) => {
      setGridComponent(() => pkg.GridComponent)
      setColumnsDirective(() => pkg.ColumnsDirective)
      setColumnDirective(() => pkg.ColumnDirective)
    })
  }, [])

  if (!GridComponent || !ColumnsDirective) return null;
  return (
    <main className='all-users wrapper'>
      <Header
        title="Manage Users"
        descprition="Filter, sort, and access user details"
      />

      <GridComponent dataSource={users} gridLines='None'>
        <ColumnsDirective>
          <ColumnDirective
            field="name"
            headerText="Name"
            width="200"
            textAlign="Left"
            template={(props: UserData) => (
              <div className="flex items-center gap-1.5 px-4">
                <img src={props.imageUrl} alt="user" className="rounded-full size-8 aspect-square" />
                <span>{props.name}</span>
              </div>
            )}
          />
          <ColumnDirective
            field="email"
            headerText="Email"
            width="200"
            textAlign="Left"
          />

          <ColumnDirective
            field="joinedAt"
            headerText="Date Joined"
            width="150"
            textAlign="Left"
            template={({joinedAt}: {joinedAt: string}) => formatDate(joinedAt)}
          />

          {/* <ColumnDirective
            field="itineraryCreated"
            headerText="ItineraryCreated Created"
            width="130"
            textAlign="Left"
          /> */}

            <ColumnDirective
            field="status"
            headerText="Type"
            width="100"
            textAlign="Left"
            template={(props: UserData) => (
              <article className={cn('status-column', props.status === 'user' ? 'bg-success-50' : 'bg-light-300'
              )}>
                <div className={cn('size-1.5 rounded-full', props.status === 'user' ? 'bg-success-500' : 'bg-gray-500')} />
                  <h3 className={cn('font-inter text-xs font-medium', props.status === 'user' ? 'text-success-700' : 'text-gray-500')}>
                    {props.status}
                  </h3>
              </article>
            )}
          />
        </ColumnsDirective>
      </GridComponent>

    </main>
  )
}

export default Allusers