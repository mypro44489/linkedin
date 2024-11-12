import { Dispatch, SetStateAction, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthentication } from "../../../../features/authentication/contexts/AuthenticationContextProvider";
import { Button } from "../../../Button/Button";
import classes from "./Profile.module.scss";

interface ProfileProps {
  showProfileMenu: boolean;
  setShowNavigationMenu: Dispatch<SetStateAction<boolean>>;
  setShowProfileMenu: Dispatch<SetStateAction<boolean>>;
}
export function Profile({
  showProfileMenu,
  setShowProfileMenu,
  setShowNavigationMenu,
}: ProfileProps) {
  const { logout } = useAuthentication();
  const ref = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  return (
    <div className={classes.root} ref={ref}>
      <button
        className={classes.toggle}
        onClick={() => {
          setShowProfileMenu((prev) => !prev);
          if (window.innerWidth <= 1080) {
            setShowNavigationMenu(false);
          }
        }}
      >
        <img className={`${classes.top} ${classes.avatar}`} src="/avatar.png" alt="" />
        <div className={classes.name}>
          <div>Jhon Doe</div>
        </div>
      </button>

      {showProfileMenu ? (
        <div className={classes.menu}>
          <div className={classes.top}>
            <div className={classes.content}>
              <img className={`${classes.left} ${classes.avatar}`} src="/avatar.png" alt="" />

              <div className={classes.right}>
                <div className={classes.name}>Jhon Doe</div>
                <div className={classes.title}>Software Engineer at Docker Inc</div>
              </div>
            </div>
            <Button size="small" outline onClick={() => navigate("profile")}>
              View Profile
            </Button>
          </div>

          <div className={classes.bottom}>
            <Link to="/settings" onClick={() => setShowProfileMenu(false)}>
              Settings & Privacy
            </Link>
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