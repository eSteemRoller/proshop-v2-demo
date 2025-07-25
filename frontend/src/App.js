
import { Outlet } from 'react-router-dom';
import Header from './components/Header';
import Footer from './components/Footer';
import { Container } from 'react-bootstrap';


export default function App() {
  return (
    <>
      <Header />
        <main className='py-3'>
          <Container>
            <Outlet />
          </Container>
        </main>
      <Footer />
    </>
  );
}

