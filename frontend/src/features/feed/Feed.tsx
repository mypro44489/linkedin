import { usePageTitle } from "../../hooks/usePageTitle.tsx";
import classes from "./Feed.module.scss";

export function Feed() {
  usePageTitle("Feed");
  return (
    <div className={classes.root}>
      <div className={classes.left}></div>
      <div className={classes.center}>
        <div className={classes.posting}></div>
        <div className={classes.feed}></div>
      </div>
      <div className={classes.right}></div>
    </div>
  );
}
