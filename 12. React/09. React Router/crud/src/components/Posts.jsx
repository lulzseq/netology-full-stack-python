import React from 'react'
import { Link } from 'react-router-dom'
import Post from './Post'

export default function Posts({ posts }) {
    return (
        <>
            <div className='posts'>
                {posts
                    .sort((a, b) => b.id - a.id)
                    .map(post => (
                        <Link to={`/posts/${post.id}`} key={post.id} style={{ width: '220px' }}>
                            <Post id={post.id} text={post.text} />
                        </Link>
                    ))}
            </div>
        </>
    )
}
