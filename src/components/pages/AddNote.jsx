import FloatingLabel from 'react-bootstrap/FloatingLabel';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container'
import Header from '../Header'
import Footer from '../Footer'
import { useState, useContext } from 'react';
import { AuthContext } from '../../contexts/Auth';
import AlertBox from '../AlertBox';
import { createNote } from '../../services/note';

function AddNote() {
  const [response, setRespons] = useState(null)
  const authContext = useContext(AuthContext)
  
  const submitHandler = (event)=>{
    event.preventDefault();
    const formData = new FormData(event.target);
    formData.append('user_id',authContext.user.id)
    if(formData.get('title')==='' || formData.get('note')==='' || formData.get('voice')===''){
      setRespons({
        message:'Fill the required fields!',
        type:'danger'
      });
      console.log(response)
    }else{
      const res = createNote(formData);
      setRespons({
        message:'File saved success fully!',
        type:'success'
      });
      console.log(res)
    }
  }
  return (
    <>
      <Header />
      <main>
        <Container>
          <Form noValidate onSubmit={submitHandler}>
            <h1>Add new note.</h1>
            {response && (
              <AlertBox alert={{message:response.message, type:response.type}}/>
            )}
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label>Title</Form.Label>
              <Form.Control type="text" placeholder="Write your note title" name="title" required />
            </Form.Group>
            <FloatingLabel controlId="floatingTextarea2" label="Write your note here" className="mb-3">
              <Form.Control
                as="textarea"
                style={{ height: '100px' }}
                name="note"
                required
              />
            </FloatingLabel>
            <Form.Select aria-label="Default select example" className="mb-3" name="voice" >
              <option value="">Select voice</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </Form.Select>
            <Button variant="primary" type="submit">
              Add Note
            </Button>
          </Form>
        </Container>
      </main>
      <Footer />
    </>
  );
}

export default AddNote;