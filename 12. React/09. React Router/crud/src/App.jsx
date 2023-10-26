import { useState, useEffect } from 'react'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Button, Row, Col } from 'reactstrap';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import NewPost from './components/NewPost';
import EditPost from './components/EditPost';
import Posts from './components/Posts';
import PostDetail from './components/PostDetail';

function App() {
  const [posts, setPosts] = useState([]);
  const [newPost, setNewPost] = useState('');

  useEffect(() => {
    handleGetPosts();
  }, [posts]);

  function handleGetPosts() {
    fetch(import.meta.env.VITE__POSTS_URL)
      .then((response) => response.json())
      .then(data => {
        setPosts(data);
      })
      .catch((error) => {
        console.error(error);
      });
  }

  async function handleNewPost() {
    if (newPost.trim() !== '') {
      const newId = posts.length > 0 ? posts[posts.length - 1].id + 1 : 0;

      try {
        await fetch(import.meta.env.VITE__POSTS_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: newId,
            text: newPost
          })
        });

        handleGetPosts();

        setNewPost('');
      } catch (error) {
        console.error(error);
      }
    }
  }

  async function handleEditPost(id, updatedText) {
    try {
      await fetch(import.meta.env.VITE__POSTS_URL + id, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          text: updatedText,
        }),
      });

      handleGetPosts();
    } catch (error) {
      console.error(error);
    }
  }

  return (
    <Router>
      <>
        <Routes>

          <Route
            path='/'
            element={
              <>
                <Row style={{ height: '100px' }}>
                  <Col>
                    <Link to='/posts/new'>
                      <Button>New Post</Button>
                    </Link>
                  </Col>
                </Row>
                <Row>
                  <Col>
                    <Posts posts={posts} />
                  </Col>
                </Row>
              </>
            }>
          </Route>

          <Route
            path='posts/new'
            element={
              <NewPost
                handleSavePost={handleNewPost}
                text={newPost}
                onChange={(e) => setNewPost(e.target.value)}
              />
            }
          >
          </Route>

          <Route
            path='/posts/:id'
            element={<PostDetail posts={posts} />}
          >
          </Route>

          <Route
            path='/posts/:id/edit'
            element={<EditPost posts={posts} handleEditPost={handleEditPost} />}
          />

        </Routes>
      </>
    </Router >
  )
}

export default App