import IRoute from "../interfaces/routes";
import EditPage from "../pages/edit";
import HomePage from "../pages/home";
import LoginPage from "../pages/login";
import TaskPage from "../pages/task";

const authRoutes: IRoute[] = [
  {
    name: "Login",
    path: "/login",
    exact: true,
    component: LoginPage,
    auth: false,
  },
  {
    name: "Register",
    path: "/register",
    exact: true,
    component: LoginPage,
    auth: false,
  },
];

const taskRoutes: IRoute[] = [
  {
    name: "Create",
    path: "/edit",
    exact: true,
    component: EditPage,
    auth: false,
  },
  {
    name: "Edit",
    path: "/edit/:taskID",
    exact: true,
    component: EditPage,
    auth: false,
  },
  {
    name: "Todo",
    path: "/task/:taskID",
    exact: true,
    component: TaskPage,
    auth: false,
  },
];

const mainRoutes: IRoute[] = [
  {
    name: "Home",
    path: "/",
    exact: true,
    component: HomePage,
    auth: false,
  },
];

const routes: IRoute[] = [...authRoutes, ...taskRoutes, ...mainRoutes];

export default routes;
