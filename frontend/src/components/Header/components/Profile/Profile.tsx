import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useAuthentication } from "../../../../features/authentication/contexts/AuthenticationContextProvider";
import { Button } from "../../../Button/Button";
import classes from "./Profile.module.scss";

export function Profile() {
  const [showMenu, setShowMenu] = useState(false);
  const { logout } = useAuthentication();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setShowMenu(false);
      }
    };

    document.addEventListener("click", handleClick);

    return () => {
      document.removeEventListener("click", handleClick);
    };
  }, []);
  return (
    <div className={classes.root} ref={ref}>
      <button className={classes.toggle} onClick={() => setShowMenu((prev) => !prev)}>
        <img className={`${classes.top} ${classes.avatar}`} src="/avatar.png" alt="" />
        <div className={classes.name}>
          <div>Jhon Doe</div>
        </div>
      </button>

      {showMenu ? (
        <div className={classes.menu}>
          <div className={classes.top}>
            <div className={classes.content}>
              <img className={`${classes.left} ${classes.avatar}`} src="/avatar.png" alt="" />

              <div className={classes.right}>
                <div className={classes.name}>Jhon Doe</div>
                <div className={classes.title}>Software Engineer at Docker Inc</div>
              </div>
            </div>
            <Button size="small" outline>
              View Profile
            </Button>
          </div>

          <div className={classes.bottom}>
            <Link to="/settings">Settings & Privacy</Link>
            <Link
              to="/logout"
              onClick={(e) => {
                e.preventDefault();
                logout();
              }}
            >
              Sign Out
            </Link>
          </div>
        </div>
      ) : null}
    </div>
  );
}
