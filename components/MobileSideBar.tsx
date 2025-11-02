import { useRef } from "react";
import { Link } from "react-router";
import NavItems from "./NavItems";
import { useSyncfusionComponent } from "~/hooks/useSyncfusionComponent";
import { initializeSyncfusionLicense } from "~/lib/syncfusion";

initializeSyncfusionLicense();

const MobileSideBar = () => {
  const sideBarRef = useRef<any>(null);
  const components = useSyncfusionComponent(
    () => import("@syncfusion/ej2-react-navigations"),
    ["SidebarComponent"]
  );

  const toggleSidebar = () => {
    sideBarRef.current?.toggle();
  };

  if (!components) return null;
  const { SidebarComponent } = components;

  return (
    <div className="mobile-sidebar">
      <header className="flex items-center justify-between p-2 bg-white shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/icons/logo.svg" alt="logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold">TourVisto</h1>
        </Link>

        <button onClick={toggleSidebar}>
          <img src="/assets/icons/menu.svg" alt="menu" className="w-7 h-7" />
        </button>
      </header>

      <SidebarComponent
        width={270}
        ref={(instance: any) => {
          if (instance) sideBarRef.current = instance;
        }}
        created={() => sideBarRef.current?.hide()}
        closeOnDocumentClick={true}
        showBackdrop={true}
      >
        <NavItems handleClick={toggleSidebar} />
      </SidebarComponent>
    </div>
  );
};

export default MobileSideBar;
