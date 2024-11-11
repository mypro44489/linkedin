import { Header } from "../../components/Header/Header.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.tsx";
import classes from "./Feed.module.scss";

export function Feed() {
  usePageTitle("Feed");
  return (
    <div className={classes.root}>
      <Header />

      <main className={classes.content}>
        <div className={classes.left}></div>
        <div className={classes.center}>
          <div className={classes.posting}></div>
          <div className={classes.feed}></div>
        </div>
        <div className={classes.right}></div>
      </main>
    </div>
  );
}
