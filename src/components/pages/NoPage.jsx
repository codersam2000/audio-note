import Header from '../Header'
import Footer from '../Footer'
import Container from 'react-bootstrap/Container'
import NoData from '../NoData';

function NoPage() {
  return (
    <>
    <Header />
    <main>
      <Container>
        <NoData content={{heading:'404', title:'Page Not Found!', text:'You may trying to wrong URL or Page hah been remobed!'}} />
      </Container>
    </main>
    <Footer />
    </>
  );
}

export default NoPage;