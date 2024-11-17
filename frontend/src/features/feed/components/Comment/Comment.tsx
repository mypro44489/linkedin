import { useNavigate } from "react-router-dom";
import { User } from "../../../authentication/contexts/AuthenticationContextProvider";
import { timeAgo } from "../../utils/date";
import classes from "./Comment.module.scss";

export interface Comment {
  id: number;
  content: string;
  author: User;
  creationDate: string;
  updatedDate?: string;
}

interface CommentProps {
  comment: Comment;
}

export function Comment({ comment }: CommentProps) {
  const navigate = useNavigate();

  return (
    <div key={comment.id} className={classes.root}>
      <button
        onClick={() => {
          navigate(`/profile/${comment.author.id}`);
        }}
      >
        <img
          className={classes.avatar}
          src={comment.author.profilePicture || "/avatar.png"}
          alt=""
        />
        <div>
          <div className={classes.name}>
            <span>{comment.author.firstName + " " + comment.author.lastName}</span>
            <span className={classes.date}>
              {timeAgo(new Date(comment.updatedDate || comment.creationDate))}
              {comment.updatedDate ? " . Edited " : ""}
            </span>
          </div>
          <div className={classes.title}>
            {comment.author.position + " at " + comment.author.company}
          </div>
        </div>
      </button>
      <div className={classes.content}>{comment.content}</div>
    </div>
  );
}

export default Comment;
