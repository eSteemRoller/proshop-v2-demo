import { Container, Row, Col } from "react-bootstrap";


export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className='bg-dark'>
      <Container>
        <Row>
          <Col className='text-center py-3'>
            <p className='text-light text-center py-3 mb-0' >ProShop &copy;{currentYear}</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};