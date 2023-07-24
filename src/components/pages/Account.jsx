import Tab from 'react-bootstrap/Tab'
import Tabs from 'react-bootstrap/Tabs'
import Container from 'react-bootstrap/Container'
import Login from '../Login'
import Register from '../Register'
import Header from '../Header'
import Footer from '../Footer'


function Account() {
  return (
    <>
    <Header />
    <main>
      <Container>
        <div className="form-tabs">
          <Tabs
            defaultActiveKey="login"
            id="uncontrolled-tab-example"
            className="form-tabs mb-3"
          >
            <Tab eventKey="login" title="Login">
              <Login />
            </Tab>
            <Tab eventKey="register" title="Registration">
              <Register />
            </Tab>
          </Tabs>
        </div>
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default Account;