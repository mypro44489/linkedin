import { Dispatch, SetStateAction, useRef } from "react";
import { Button } from "../../../../components/Button/Button";
import { Post } from "../Post/Post";
import classes from "./PostingModal.module.scss";
interface PostingMadalProps {
  showPostingModal: boolean;
  setShowPostingModal: Dispatch<SetStateAction<boolean>>;
  onSubmit: (post: Post) => void;
}
export function PostingMadal({
  setShowPostingModal,
  showPostingModal,
  onSubmit,
}: PostingMadalProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  if (!showPostingModal) return null;

  return (
    <div className={classes.root}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3 className={classes.title}>Creating a post</h3>
          <button onClick={() => setShowPostingModal(false)}>X</button>
        </div>
        <div className={classes.body}>
          <textarea ref={textareaRef} placeholder="What do you want to talk about?" />
        </div>
        <div className={classes.footer}>
          <Button
            onClick={(e) => {
              e.preventDefault();
              if (!textareaRef.current?.value) return;

              onSubmit({
                id: Math.random() * 1000,
                content: textareaRef.current.value,
                user: {
                  id: 1,
                  name: "Jhon Doe",
                  avatar: "/avatar.png",
                },
              });
              setShowPostingModal(false);
            }}
            size="medium"
          >
            Post
          </Button>
        </div>
      </div>
    </div>
  );
}
