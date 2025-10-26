import { Outlet, redirect } from "react-router";
import { MobileSideBar, NavItems } from "../../../components/index";
import { useEffect, useState } from "react";
import { account } from "~/appwrite/client";
import { getExistingUser, storeUserData } from "~/appwrite/auth";

/**
 * The `AdminLayout` component serves as the layout for the admin section of the application.
 * It dynamically imports the `SidebarComponent` from the `@syncfusion/ej2-react-navigations` package
 * and renders it alongside other layout elements.
 *
 * @component
 *
 * @remarks
 * - The `SidebarComponent` is loaded dynamically using `import()` to optimize the initial load time.
 * - The component uses `useState` to manage the dynamically imported `SidebarComponent`.
 * - The `useEffect` hook ensures the `SidebarComponent` is only imported once when the component mounts.
 *
 * @returns {JSX.Element | null} The rendered admin layout or `null` if the `SidebarComponent` is not yet loaded.
 *
 * @example
 * ```tsx
 * <AdminLayout />
 * ```
 *
 * @dependencies
 * - `@syncfusion/ej2-react-navigations` for the `SidebarComponent`.
 * - `MobileSideBar` and `NavItems` components for additional layout functionality.
 * - `Outlet` from `react-router-dom` for rendering nested routes.
 *
 * @css
 * - `.admin-layout` for the main layout styling.
 * - `.children` for the content area styling.
 * - `.w-full`, `.max-w-[270px]`, `.hidden`, `.lg:block` for responsive design.
 */
export async function clientLoader() {
    try {
        const user = await account.get();

        if(!user.$id) return redirect("/sign-in");

        const existingUser = await getExistingUser(user.$id);

        if (existingUser?.status === 'user') {
            return redirect("/");
        }
        return existingUser?.$id ? existingUser : await storeUserData();
    } catch(e) {
        console.log("Error in clientLoader: ", e);
        return redirect("/sign-in");
    }
}
const AdminLayout = () => {
  const [SidebarComponent, setSidebarComponent] = useState<any>(null);

  useEffect(() => {
    import("@syncfusion/ej2-react-navigations").then((pkg) => {
      setSidebarComponent(() => pkg.SidebarComponent);
    });
  }, []);

  if (!SidebarComponent) return null;

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
