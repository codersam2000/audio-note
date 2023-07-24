import {useRef, useState, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import {Form, Button} from 'react-bootstrap';


import {AuthContext} from '../contexts/Auth'


function Login() {
  const userNameInputRef = useRef();
  const passwordInputRef = useRef();
  const navigate = useNavigate();
  const [error, setError] = useState('')

  const authContext = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`http://127.0.0.1:8000/api/user/login/`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        username: userNameInputRef.current.value,
        password: passwordInputRef.current.value
      })
    })
    .then((res) => {
      if (res.ok && res.status !== 400 ) {
        return res.json()
          .then(data => {
            if (data.type === 'success'){
              authContext.login(data.user, data.token);
              navigate('/')
            }else{
              setError(data.message)
            }
          })
      } else if (!res.ok && res.status === 400) {
        return res.json()
          .then(responseData => {
            setError(responseData.non_field_errors[0])
          })
      }
    })
    .catch(err => {
      alert(err)
    })
  }
  return (
    <>
    <Form onSubmit={handleSubmit}>
      {error && (
        <>
            <p style={{marginTop: '20px', textAlign: 'center', color: 'red'}}>{error}</p>
        </>
      )}
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <Form.Label>Usrname</Form.Label>
        <Form.Control type="text" placeholder="username" ref={userNameInputRef} />
        <Form.Text className="text-muted">
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" ref={passwordInputRef} />
      </Form.Group>
      <Button variant="primary" type="submit">
        Login
      </Button>
    </Form>
    </>
  );
}

export default Login;