import { useRef, useState, useEffect } from "react";
import { Link } from "react-router";
import NavItems from "./NavItems";

import { registerLicense } from "@syncfusion/ej2-base";

registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);

const MobileSideBar = () => {
  const [SidebarComponent, setSidebarComponent] = useState<any>(null);
  const sideBarRef = useRef<any>(null);

  const toggleSidebar = () => {
    sideBarRef.current?.toggle();
  };

  useEffect(() => {
    import("@syncfusion/ej2-react-navigations").then((pkg) => {
      setSidebarComponent(() => pkg.SidebarComponent);
    });
  }, []);

  if (!SidebarComponent) return null;

  return (
    <div className="mobile-sidebar">
      <header className="flex items-center justify-between p-2 bg-white shadow-md">
        <Link to="/" className="flex items-center gap-2">
          <img src="/assets/icons/logo.svg" alt="logo" className="w-8 h-8" />
          <h1 className="text-lg font-bold">TourVistoMobile</h1>
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
