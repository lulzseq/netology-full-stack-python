import Post from "./Post";
import { useParams } from "react-router-dom";

export default function PostDetail({ posts }) {
    const { id } = useParams();
    const post = posts.find(post => post.id === Number(id));

    if (!post) {
        return <div>Loading...</div>;
    }

    return (
        <Post
            id={id}
            text={post.text}
        />
    );
}