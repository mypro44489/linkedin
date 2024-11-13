import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "../../components/Button/Button.tsx";
import { usePageTitle } from "../../hooks/usePageTitle.tsx";
import { LeftSidebar } from "./components/LeftSidebar/LeftSidebar.tsx";
import { Post } from "./components/Post/Post.tsx";
import { PostingMadal } from "./components/PostingModal/PostingMadal.tsx";
import classes from "./Feed.module.scss";

export function Feed() {
  usePageTitle("Feed");
  const [showPostingModal, setShowPostingModal] = useState(false);
  const navigate = useNavigate();
  const [posts, setPosts] = useState([
    {
      id: 1,
      content: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit",
      user: {
        id: 1,
        name: "Jhon Doe",
        avatar: "/avatar.png",
      },
    },
    {
      id: 2,
      content: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit",
      user: {
        id: 1,
        name: "Jhon Doe",
        avatar: "/avatar.png",
      },
    },

    {
      id: 3,
      content: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit",
      user: {
        id: 1,
        name: "Jhon Doe",
        avatar: "/avatar.png",
      },
    },

    {
      id: 4,
      content: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit",
      user: {
        id: 1,
        name: "Jhon Doe",
        avatar: "/avatar.png",
      },
    },

    {
      id: 5,
      content: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit",
      user: {
        id: 1,
        name: "Jhon Doe",
        avatar: "/avatar.png",
      },
    },

    {
      id: 6,
      content: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit",
      user: {
        id: 1,
        name: "Jhon Doe",
        avatar: "/avatar.png",
      },
    },

    {
      id: 7,
      content: "Lorem Ipsum Dolor Sit Amet Consectetur Adipisicing Elit",
      user: {
        id: 1,
        name: "Jhon Doe",
        avatar: "/avatar.png",
      },
    },
  ]);
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
      <div className={classes.right}></div>
    </div>
  );
}
