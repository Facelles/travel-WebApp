import { Link, useLocation } from "react-router";
import { cn } from "~/lib/utils";
import { useSyncfusionComponent } from "~/hooks/useSyncfusionComponent";

type Props = {
  title: string;
  descprition?: string;
  ctaText?: string;
  ctaUrl?: string;
}

/**
 * Header component that displays a title and description based on the current location path.
 *
 * @param {Object} Props - The props object.
 * @param {string} Props.title - The title to be displayed in the header.
 * @param {string} Props.descprition - The description to be displayed in the header.
 *
 * @returns {JSX.Element} The rendered Header component.
 */
const Header = ({ title, descprition, ctaText, ctaUrl }: Props) => {
  const location = useLocation();
  const components = useSyncfusionComponent(
    () => import("@syncfusion/ej2-react-buttons"),
    ["ButtonComponent"]
  );

  if (!components) return null;
  const { ButtonComponent } = components;

  return (
    <header className="header">
      <article>
        <h1 className={cn("text-dark-100", location.pathname === '/' ? 'text-2xl md:text-4xl font-bold':
          'textl-xl md:text-2xl font-semibold'
        )}>
          {title}
        </h1>
        <p className={cn("text-gray-100 font-normal", location.pathname === '/' ? 'text-base md:text-lg':
          'textl-sm md:text-lg')}>
          {descprition}
        </p>
      </article>
        {ctaText && ctaUrl && (
          <Link to={ctaUrl}>
            <ButtonComponent type="button" className="button-class !h-11 !w-full md:w-[240px]">
              <img src="/assets/icons/plus.svg" alt="plus"  className="size-5"/>
              <span className="p-16-semibold text-white">{ctaText}</span>
            </ButtonComponent>
          </Link>
        )}
    </header>
  )
}

export default Header