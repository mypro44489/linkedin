import classes from "./LeftSidebar.module.scss";
export function LeftSidebar() {
  return (
    <div className={classes.root}>
      <div className={classes.cover}>
        <img
          src="https://images.pexels.com/photos/1323206/pexels-photo-1323206.jpeg?cs=srgb&dl=pexels-mixu-513809-1323206.jpg&fm=jpg"
          alt="Cover"
        />
      </div>
      <div className={classes.avatar}>
        <img src="/avatar.png" alt="" />
      </div>
      <div className={classes.name}>Jhon Doe</div>
      <div className={classes.title}>Software Engineer at Docker Inc</div>
      <div className={classes.info}>
        <div className={classes.item}>
          <div className={classes.label}>Profile viewers</div>
          <div className={classes.value}>1,234</div>
        </div>
        <div className={classes.item}>
          <div className={classes.label}>Connexions</div>
          <div className={classes.value}>4,567</div>
        </div>
      </div>
    </div>
  );
}
