import { useLocation } from "react-router";
import { cn } from "~/lib/utils"; 

type Props = {
  title: string;
  descprition?: string;
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
const Header = ({ title, descprition }: Props) => {
  const location = useLocation();

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
    </header>
  )
}

export default Header