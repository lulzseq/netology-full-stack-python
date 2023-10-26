import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import PostForm from './PostFrom';

export default function EditPost({ posts, handleEditPost }) {
    const { id } = useParams();
    const post = posts.find((post) => post.id === Number(id));

    if (!post) {
        return <div>Loading...</div>;
    }

    const [editedText, setEditedText] = useState(post.text);

    return <PostForm
        handleSavePost={() => handleEditPost(id, editedText)}
        text={editedText}
        onChange={(e) => setEditedText(e.target.value)}
        actionName="Edit"
    />;
}