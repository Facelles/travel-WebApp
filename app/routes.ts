import { type RouteConfig, layout, route } from "@react-router/dev/routes";

const routes: RouteConfig = [
  layout("./routes/admin/admin-layout.tsx", [
    route("dashboard", "./routes/admin/dashboard.tsx"),
    route("all-users", "./routes/admin/all-users.tsx"),
  ]),
  route("sign-in", "./routes/root/sign-in.tsx"),
  route("/", "./routes/main.tsx", {
  }),
];

export default routes;
