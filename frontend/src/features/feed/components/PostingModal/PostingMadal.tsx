import { Dispatch, FormEvent, SetStateAction, useState } from "react";
import { Button } from "../../../../components/Button/Button";
import { Input } from "../../../../components/Input/Input";
import { Post } from "../Post/Post";
import classes from "./PostingModal.module.scss";
interface PostingMadalProps {
  showPostingModal: boolean;
  setShowPostingModal: Dispatch<SetStateAction<boolean>>;
  setPosts: Dispatch<SetStateAction<Post[]>>;
}
export function PostingMadal({
  setShowPostingModal,
  showPostingModal,
  setPosts,
}: PostingMadalProps) {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  if (!showPostingModal) return null;

  const post = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    const content = e.currentTarget.content.value.trim();
    const picture = e.currentTarget.picture.value.trim();
    if (!content) {
      setError("Please enter a message.");
      return;
    }
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "/api/v1/posts", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: content,
          picture: picture,
        }),
      });
      if (!response.ok) {
        const { message } = await response.json();
        throw new Error(message);
      }
      const data = await response.json();
      setPosts((prev) => [data, ...prev]);
      setShowPostingModal(false);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError("An error occurred. Please try again later.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3 className={classes.title}>Creating a post</h3>
          <button onClick={() => setShowPostingModal(false)}>X</button>
        </div>
        <form onSubmit={post}>
          <div className={classes.body}>
            <textarea
              placeholder="What do you want to talk about?"
              onFocus={() => setError("")}
              onChange={() => setError("")}
              name="content"
            />
            <Input
              placeholder="Image URL (optional)"
              name="picture"
              style={{
                marginBlock: 0,
              }}
            />
          </div>
          {error && <div className={classes.error}>{error}</div>}
          <div className={classes.footer}>
            <Button size="medium" type="submit" disabled={isLoading}>
              Post
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}
