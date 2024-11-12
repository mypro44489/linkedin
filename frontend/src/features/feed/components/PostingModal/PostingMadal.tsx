import { Dispatch, SetStateAction } from "react";
import { Button } from "../../../../components/Button/Button";
import classes from "./PostingModal.module.scss";
interface PostingMadalProps {
  showPostingModal: boolean;
  setShowPostingModal: Dispatch<SetStateAction<boolean>>;
}
export function PostingMadal({ setShowPostingModal, showPostingModal }: PostingMadalProps) {
  if (!showPostingModal) return null;

  return (
    <div className={classes.root}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3 className={classes.title}>Creating a post</h3>
          <button onClick={() => setShowPostingModal(false)}>X</button>
        </div>
        <div className={classes.body}>
          <textarea placeholder="What do you want to talk about?" />
        </div>
        <div className={classes.footer}>
          <Button size="medium">Post</Button>
        </div>
      </div>
    </div>
  );
}
