import React from 'react';
import PostForm from './PostFrom';

export default function NewPost({ handleSavePost, text, onChange }) {
  return <PostForm
    handleSavePost={handleSavePost}
    text={text}
    onChange={onChange}
    actionName="New"
  />;
}