import { Outlet } from "react-router";
import { MobileSideBar, NavItems } from "../../../components/index";
import { useEffect, useState } from "react";

const AdminLayout = () => {
  const [SidebarComponent, setSidebarComponent] = useState<any>(null);

  useEffect(() => {
    import("@syncfusion/ej2-react-navigations").then((pkg) => {
      setSidebarComponent(() => pkg.SidebarComponent);
    });
  }, []);

  if (!SidebarComponent) return null; // запобігаємо рендеру undefined

  return (
    <div className="admin-layout">
      <MobileSideBar />

      <aside className="w-full max-w-[270px] hidden lg:block">
        <SidebarComponent width={270} enableGestures={false}>
          <NavItems />
        </SidebarComponent>
      </aside>

      <aside className="children">
        <Outlet />
      </aside>
    </div>
  );
};

export default AdminLayout;
