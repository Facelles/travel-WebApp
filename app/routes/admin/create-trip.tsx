import { useState, useEffect } from 'react'
import { Header } from '../../../components'
import type { Route } from './+types/create-trip';

export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flags,latlng,openStreetMaps');

  const data = await response.json();

  console.log(data)

  return data;
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const [ComboBocComponent, setComboBocComponent] = useState<any>(null);

  const handleSubmit = async () => { };
  const countries =  loaderData as Country[];

  useEffect(() => {
    import("@syncfusion/ej2-react-dropdowns").then((pkg) => {
      setComboBocComponent(() => pkg.ComboBoxComponent)
    })
  });

  if (!ComboBocComponent) return null

  return (
    <main className='flex flex-col gap-10 pb-20 wrapper'>
      <Header title='Add a New Trip' descprition='View and edit AI-Generated travel plans' />

      <section className='mt-2.5 wrapper-md'>
        <form className='trip-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">
              Country
            </label>
            <ComboBocComponent
              id="country"
              dataSource={['title']}
            />
          </div>
        </form>
      </section>

    </main>
  )
}

export default CreateTrip