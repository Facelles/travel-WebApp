import { Link, NavLink, useLoaderData, useNavigate } from "react-router";
import { sidebarItems } from "~/constants";
import { cn } from "~/lib/utils";
import { registerLicense } from "@syncfusion/ej2-base";
import { logoutUser } from "~/appwrite/auth";

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

const NavItems = ({ handleClick }: { handleClick?: () => void }) => {
    const user = useLoaderData();
    const navigate = useNavigate();

    const handleLogout = async () => {
        await logoutUser();
        navigate('/sign-in');
    }

    return (
        <section className="nav-items">
            <Link to="/" className="link-logo">
                <img
                    src="/assets/icons/logo.svg"
                    alt="logo"
                    className="size-[30px]"
                />
                <h1>TourVisto</h1>
            </Link>

            <div className="container">
                <nav>
                    {sidebarItems.map(({ id, href, icon, label }) => (
                        <NavLink to={href} key={id}>
                            {({ isActive }: { isActive: boolean }) => (
                                <div
                                    className={cn("group nav-item", {
                                        "bg-primary-100 !text-white": isActive,
                                    })}
                                    onClick={handleClick}>
                                    <img
                                        src={icon}
                                        alt={label}
                                        className={`group-hover:brightness-0 size-5 group-hover:invert ${isActive ? "brightness-0 invert" : "text-dark-200"} `}
                                    />
                                    {label}
                                </div>
                            )}
                        </NavLink>
                    ))}
                </nav>

                <footer className="nav-footer">
                    <img src={user?.imageUrl || '/assets/images/david.webp'} alt={user?.name || 'David'} />
                    <article>
                        <h2>
                            {user?.name || 'Guest'}
                        </h2>
                        <p>{user?.email || ''}</p>
                    </article>

                    <button
                        onClick={handleLogout}
                        className="cursor-pointer"
                        aria-label="Logout"
                    >
                        <img src="/assets/icons/logout.svg" alt="logout" className="size-6" />
                    </button>
                </footer>

            </div>
        </section>
    );
};

export default NavItems;
