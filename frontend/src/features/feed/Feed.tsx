import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.tsx";
import { LeftSidebar } from "./components/LeftSidebar/LeftSidebar.tsx";
import { Post } from "./components/Post/Post.tsx";
import { PostingMadal } from "./components/PostingModal/PostingMadal.tsx";
import { RightSidebar } from "./components/RightSidebar/RightSidebar.tsx";
import classes from "./Feed.module.scss";

export function Feed() {
  usePageTitle("Feed");
  const [showPostingModal, setShowPostingModal] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(import.meta.env.VITE_API_URL + "/api/v1/posts", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        if (!response.ok) {
          const { message } = await response.json();
          throw new Error(message);
        }
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occurred. Please try again later.");
        }
      }
    };
    fetchPosts();
  }, []);
  return (
    <div className={classes.root}>
      <div className={classes.left}>
        <LeftSidebar />
      </div>
      <div className={classes.center}>
        <div className={classes.posting}>
          <button
            onClick={() => {
              navigate("/profile/1");
            }}
          >
            <img className={`${classes.top} ${classes.avatar}`} src="/avatar.png" alt="" />
          </button>
          <Button outline onClick={() => setShowPostingModal(true)}>
            Start a post
          </Button>
          <PostingMadal
            showPostingModal={showPostingModal}
            setShowPostingModal={setShowPostingModal}
            onSubmit={(post: Post) => {
              setPosts((prev) => [post, ...prev]);
            }}
          />
        </div>
        <div className={classes.feed}>
          {posts.map((post) => (
            <Post key={post.id} post={post} />
          ))}
        </div>
      </div>
      <div className={classes.right}>
        <RightSidebar />
      </div>
    </div>
  );
}
