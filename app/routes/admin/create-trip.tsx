import { Header } from '../../../components'
import { useSyncfusionComponent } from "~/hooks/useSyncfusionComponent";
import type { Route } from './+types/create-trip';


export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,flags,latlng,maps');

  const data = await response.json();

  return data.map((country: any) => ({
    name: country.flag + country.name.common,
    flagUrl: country.flags.svg,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMaps: country.maps?.openStreetMaps,
  }));
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const handleSubmit = async () => { };
  const handleChange = (key: keyof TripFormData, value: string | number) => { }

  const countries = loaderData as Country[];

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const components = useSyncfusionComponent(
    () => import("@syncfusion/ej2-react-dropdowns"),
    ["ComboBoxComponent"]
  );

  if (!components) return null;
  const { ComboBoxComponent } = components;

  return (
    <main className='flex flex-col gap-10 pb-20 wrapper'>
      <Header title='Add a New Trip' descprition='View and edit AI-Generated travel plans' />

      <section className='mt-2.5 wrapper-md'>
        <form className='trip-form' onSubmit={handleSubmit}>
          <div>
            <label htmlFor="country">
              Country
            </label>
            <ComboBoxComponent
              id="country"
              dataSource={countryData}
              fields={{ text: 'text', value: 'value' }}
              placeholder="Select a Country"
              className="combo-box"
              change={(e: { value: string | undefined }) => {
                if (e.value) {
                  handleChange('country', e.value);
                }
              }}
              allowFiltering={true}
              filtering={(e: any) => {
                const query = e.text.toLowerCase();

                const filtered = countries
                  .filter((country) => country.name.toLowerCase().includes(query))
                  .map((country) => ({
                    text: country.name,
                    value: country.value
                  }));

                e.updateData(filtered);
              }}
            />
          </div>

          <div>
            <label htmlFor="duration">Duration</label>
            <input 
            type='number'
            id='duration'
            min="1" 
            name='duration' 
            placeholder='Enter a number of days (5, 12 ...)' 
            className='placeholder:text-gray-100 form-input'
            onChange={(e: any) => handleChange('duration', Number(e.target.value))}
             />
          </div>

        </form>
      </section>

    </main>
  )
}

export default CreateTrip