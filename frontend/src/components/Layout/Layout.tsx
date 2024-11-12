import { Outlet } from "react-router-dom";
import { Header } from "../Header/Header";
import classes from "./Layout.module.scss";
export function Layout() {
  return (
    <div className={classes.root}>
      <Header />
      <main className={classes.container}>
        <Outlet />
      </main>
    </div>
  );
}
