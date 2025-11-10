import { Header } from '../../../components'
import { useState } from 'react'
import { useSyncfusionComponent } from "~/hooks/useSyncfusionComponent";
import type { Route } from './+types/create-trip';
import { comboBoxItems, selectItems } from '~/constants';
import { cn, formatKey } from '~/lib/utils';
import { world_map } from '~/constants/world_map';
import { account } from '~/appwrite/client';
import { useNavigate } from 'react-router';


export const loader = async () => {
  const response = await fetch('https://restcountries.com/v3.1/all?fields=name,capital,flag,flags,latlng,maps');
  const data = await response.json();

  return data.map((country: any) => ({
    name: country.flag + country.name.common,
    flagUrl: country.flags.svg,
    coordinates: country.latlng,
    value: country.name.common,
    openStreetMap: country.maps?.openStreetMap,
  }));
}

const CreateTrip = ({ loaderData }: Route.ComponentProps) => {
  const navigate = useNavigate();
  const countries = loaderData as Country[];

  const [formData, setFormData] = useState<TripFormData>({
    country: countries[0]?.name || '',
    travelStyle: '',
    duration: 1,
    budget: '',
    interest: '',
    groupType: '',
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);


    if (!formData.country || !formData.duration || !formData.travelStyle || !formData.budget || !formData.interest || !formData.groupType) {
      setError('Please fill in all fields.');
      setLoading(false);
      return;
    }
    if (formData.duration <= 0 || formData.duration > 10) {
      setError('Duration must be between 1 and 10 days.');
      setLoading(false);
      return;
    }
    const user = await account.get();
    if (!user.$id) {
      setError('You must be logged in to create a trip.');
      setLoading(false);
      return;
    }

    try {
      const response = await fetch('/api/create-trip', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          country: formData.country,
          duration: formData.duration,
          travelStyle: formData.travelStyle,
          interests: formData.interest,
          budget: formData.budget,
          groupType: formData.groupType,
          userId: user.$id,
        }),
      });

      const result: CreateTripResponse = await response.json();
      if(result.id) navigate(`/trips/${result.id}`);
      else console.error('Failde to generate trip')

    }
    catch (err) {
      setError('An error occurred while creating the trip. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (key: keyof TripFormData, value: string | number) => {
    setFormData({ ...formData, [key]: value });
  }

  const countryData = countries.map((country) => ({
    text: country.name,
    value: country.value,
  }));

  const mapData = [
    {
      country: formData.country,
      color: '#EA382E',
      coordinates: countries.find((c) => c.name === formData.country)?.coordinates || [],
    }
  ]

  const dropdownComponents = useSyncfusionComponent(
    () => import("@syncfusion/ej2-react-dropdowns"),
    ["ComboBoxComponent"]
  );

  const mapComponents = useSyncfusionComponent(
    () => import("@syncfusion/ej2-react-maps"),
    ["MapsComponent", "LayerDirective", "LayersDirective"]
  );

  const buttonComponents = useSyncfusionComponent(
    () => import("@syncfusion/ej2-react-buttons"),
    ["ButtonComponent"]
  );

  if (!dropdownComponents || !mapComponents || !buttonComponents) return null;
  const { ComboBoxComponent } = dropdownComponents;
  const { MapsComponent, LayersDirective, LayerDirective } = mapComponents;
  const { ButtonComponent } = buttonComponents;

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

          {selectItems.map((key) => (
            <div key={key}>
              <label htmlFor={formatKey(key)}>
                {key}
              </label>

              <ComboBoxComponent
                id={key}
                dataSource={comboBoxItems[key].map((item) => ({ text: item, value: item }))}
                fields={{ text: 'text', value: 'value' }}
                placeholder={`Select a ${key}`}
                className="combo-box"
                change={(e: { value: string | undefined }) => {
                  if (e.value) {
                    handleChange(key, e.value);
                  }
                }}
                allowFiltering={true}
                filtering={(e: any) => {
                  const query = e.text.toLowerCase();

                  const filtered = comboBoxItems[key]
                    .filter((item) => item.toLowerCase().includes(query))
                    .map((item) => ({
                      text: item,
                      value: item
                    }));

                  e.updateData(filtered);
                }}
              />
            </div>
          ))}

          <div>
            <label htmlFor="location">
              Location on the world map
            </label>
            <MapsComponent>
              <LayersDirective>
                <LayerDirective
                  dataSource={mapData}
                  shapeData={world_map}
                  shapeDataPath='country'
                  shapePropertyPath='name'
                  shapeSettings={{
                    fill: '#e5e5e5',
                    colorValuePath: 'color',
                  }}
                />
              </LayersDirective>
            </MapsComponent>
          </div>

          <div className='bg-gray-200 h-px w-full ' />
          {error && (
            <div className='error'>
              <p>
                {error}
              </p>
            </div>
          )}
          <footer className='px-6 w-full'>
            <ButtonComponent type='submit' className='button-class !h-12 !w-full' disabled={loading}>
              <img src={`/assets/icons/${loading ? 'loader.svg' : 'magic-star.svg'}`} className={cn('size-5', { 'animate-spin': loading })} />
              <span className='p-18-semibold text-white'>
                {loading ? 'Creating Trip...' : 'Create Trip Plan'}
              </span>
            </ButtonComponent>
          </footer>
        </form>
      </section>
    </main>
  )
}

export default CreateTrip