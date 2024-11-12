import { useState } from "react";
import { Button } from "../../components/Button/Button.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.tsx";
import { PostingMadal } from "./components/PostingModal/PostingMadal.tsx";
import classes from "./Feed.module.scss";

export function Feed() {
  usePageTitle("Feed");
  const [showPostingModal, setShowPostingModal] = useState(false);
  return (
    <div className={classes.root}>
      <div className={classes.left}></div>
      <div className={classes.center}>
        <div className={classes.posting}>
          <img className={`${classes.top} ${classes.avatar}`} src="/avatar.png" alt="" />
          <Button outline onClick={() => setShowPostingModal(true)}>
            Start a post
          </Button>
          <PostingMadal
            showPostingModal={showPostingModal}
            setShowPostingModal={setShowPostingModal}
          />
        </div>
        <div className={classes.feed}></div>
      </div>
      <div className={classes.right}></div>
    </div>
  );
}
