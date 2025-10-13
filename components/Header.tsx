type Props = {
  title: string;
  descprition?: string;
}

const Header = ({ title, descprition }: Props) => {
  return (
    <header className="header">
      <article>
        <h1>
          {title}
        </h1>
        <p>
          {descprition}
        </p>
      </article>
    </header>
  )
}

export default Header