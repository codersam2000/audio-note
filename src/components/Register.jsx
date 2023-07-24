import {useRef, useState, useContext} from 'react'
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Row from 'react-bootstrap/Row';
import * as formik from 'formik';
import * as yup from 'yup';
import { useNavigate } from 'react-router-dom';
import {AuthContext} from '../contexts/Auth'
function Register() {
  const [error, setErrors] = useState('')
  const navigate = useNavigate();
  const authContext = useContext(AuthContext);
  const firstNameRef = useRef()
  const lastNameRef = useRef()
  const emailRef = useRef()
  const usernameRef = useRef()
  const passwordRef = useRef()
  const password2Ref = useRef()

  
  const submitHandler = (e)=>{
    e.preventDefault();
    const userData = {
      first_name : firstNameRef.current.value,
      last_name : lastNameRef.current.value,
      email : emailRef.current.value,
      username : usernameRef.current.value,
      password : passwordRef.current.value,
      password2 : password2Ref.current.value,
    }
    fetch(`http://127.0.0.1:8000/api/user/register/`, {
      method: "POST",
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(userData)
      })
      .then((res) => {
          if(res.ok) {
            return res.json()
            .then(data => {
              if (data.type === 'success'){
                authContext.login(data.user, data.token);
                navigate('/')
              }else if(data.type === 'error'){
                setErrors(data.message)
              }
            })
          } else {
              return res.json()
              .then(responseData => {
                setErrors(responseData.non_field_errors[0])
              })
          }
        })
        .catch(err => {
          alert(err)
        })
  }
  const { Formik } = formik;

  const schema = yup.object().shape({
    firstName: yup.string().required(),
    lastName: yup.string().required(),
    username: yup.string().required(),
    email: yup.string().required(),
    password: yup.string().required(),
    confirm_password: yup.string().required(),
    terms: yup.bool().required().oneOf([true], 'Terms must be accepted'),
  });
  return (
    <Formik
      validationSchema={schema}
      initialValues={{
        firstName: 'Mark',
        lastName: 'Otto',
        username: '',
        email: '',
        password: '',
        confirm_password:'',
        terms: false,
      }}
    >
      {({handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={submitHandler}>
          {error && (
            <p style={{marginTop: '20px', textAlign: 'center', color: 'red'}}>{error}</p>
            )
          }
          <Row className="mb-2">
            <Form.Group as={Col} md="6" controlId="validationFormik01">
              <Form.Label>First name</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                ref={firstNameRef}
                value={values.firstName}
                onChange={handleChange}
                isValid={touched.firstName && !errors.firstName}
              />
              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
            <Form.Group as={Col} md="6" controlId="validationFormik02">
              <Form.Label>Last name</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                ref={lastNameRef}
                value={values.lastName}
                onChange={handleChange}
                isValid={touched.lastName && !errors.lastName}
              />

              <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} md="12" controlId="validationFormikEmail">
              <Form.Label>Email</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="email"
                  placeholder="Email"
                  ref={emailRef}
                  aria-describedby="inputGroupPrepend"
                  name="email"
                  value={values.email}
                  onChange={handleChange}
                  isInvalid={!!errors.email}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.email}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} md="12" controlId="validationFormikUsername">
              <Form.Label>Username</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Text id="inputGroupPrepend">@</InputGroup.Text>
                <Form.Control
                  type="text"
                  placeholder="Username"
                  ref={usernameRef}
                  aria-describedby="inputGroupPrepend"
                  name="username"
                  value={values.username}
                  onChange={handleChange}
                  isInvalid={!!errors.username}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.username}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} md="12" controlId="validationFormikPassword">
              <Form.Label>Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  ref={passwordRef}
                  aria-describedby="inputGroupPrepend"
                  name="password"
                  value={values.password}
                  onChange={handleChange}
                  isInvalid={!!errors.password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>
          <Row className="mb-2">
            <Form.Group as={Col} md="12" controlId="validationFormikConfirm_password">
              <Form.Label>Confirm Password</Form.Label>
              <InputGroup hasValidation>
                <Form.Control
                  type="password"
                  placeholder="Retype Password"
                  ref={password2Ref}
                  aria-describedby="inputGroupPrepend"
                  name="confirm_password"
                  value={values.confirm_password}
                  onChange={handleChange}
                  isInvalid={!!errors.confirm_password}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.confirm_password}
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group>
          </Row>

          <Form.Group className="mb-3">
            <Form.Check
              required
              name="terms"
              label="Agree to terms and conditions"
              onChange={handleChange}
              isInvalid={!!errors.terms}
              feedback={errors.terms}
              feedbackType="invalid"
              id="validationFormik0"
            />
          </Form.Group>
          <Button type="submit">Submit form</Button>
        </Form>
      )}
    </Formik>
  );
}

export default Register;