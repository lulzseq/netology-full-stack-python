import { FormGroup, Label, Input, Button, CloseButton, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

export default function PostForm({ handleSavePost, text, onChange, actionName }) {
    return (
        <div className='post'>
            <FormGroup>
                <Label for="exampleText">{actionName} post</Label>
                <Row>
                    <Col>
                        <Input
                            id='exampleText'
                            name='text'
                            type='textarea'
                            value={text}
                            onChange={onChange}
                        />
                    </Col>
                    <Col>
                        <Link to={'/'}>
                            <CloseButton />
                        </Link>
                    </Col>
                </Row>
                <Link to={'/'}>
                    <Button size='sm' onClick={handleSavePost}>
                        Save
                    </Button>
                </Link>
            </FormGroup>
        </div>
    );
}