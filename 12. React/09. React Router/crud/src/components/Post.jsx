import React from 'react';
import { Button, Card, CardBody, CardText, Col, Row } from 'reactstrap';
import { useNavigate } from 'react-router-dom';
import '../App.css';

function Post({ id, text }) {
    const navigate = useNavigate();

    async function handleDeletePost(e) {
        e.preventDefault();
        fetch(import.meta.env.VITE__POSTS_URL + id, {
            method: 'DELETE'
        }).catch((error) => {
            console.error(error);
        })
        navigate('/');
    };

    async function handleEditPost(e) {
        e.preventDefault();
        navigate(`/posts/${id}/edit`);
    };

    return (
        <>
            <div className='post'>
                <Card>
                    <CardBody>
                        <CardText>{text}</CardText>
                        <Row>
                            <Col>
                                <Button size='sm' outline onClick={handleEditPost}>Edit</Button>
                            </Col>
                            <Col>
                                <Button size='sm' color='danger' outline onClick={handleDeletePost}>Delete</Button>
                            </Col>
                        </Row>
                    </CardBody>
                </Card>
            </div>
        </>
    );
}

export default Post;
