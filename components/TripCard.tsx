import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router"
import { getFirstWord, cn } from "~/lib/utils";

const TripCard = ({ id, name, location, imageUrl, tags, price }: TripCardProps) => {
  const [ChipListComponent, setChipListComponent] = useState<any>(null);
  const [ChipsDirective, setChipsDirective] = useState<any>(null)
  const path = useLocation();

  useEffect(() => {
    import("@syncfusion/ej2-react-buttons").then((pkg) => {
      setChipListComponent(() => pkg.ChipListComponent);
      setChipsDirective(() => pkg.ChipsDirective);
    })
  }, [])

    if (!ChipListComponent || !ChipsDirective) return null;

  return (
    <Link to={path.pathname === '/' || path.pathname.startsWith('/travel') ? `/travel/${id}` : `/trips/${id}`}
     className="trip-card">
      <img src={imageUrl} alt={name} />

      <article>
        <h2>{name}</h2>
        <figure>
          <img src="/assets/icons/location-mark.svg" alt="location-mark"
          className="size-4"
           />
        </figure>
        <figcaption>{location}</figcaption>
      </article>

      <div className="mt-5 pl-[18px] pr-3.5 pb-5">
        <ChipListComponent id="travel-chip">
          <ChipsDirective>
            {tags.map((tag, index) => (
              <ChipsDirective>
                key={index}
                text={getFirstWord(tag)}
                cssClass={cn(index === 1
                  ? '!bg-pink-50 !text-pink-500'
                  : '!bg-success-50 !text-success-700'
                )}
              </ChipsDirective>
            ))}
          </ChipsDirective>
        </ChipListComponent>
      </div>
      <article className="tripCard-pill">{price}</article>
    </Link>
  )
}

export default TripCard