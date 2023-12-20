import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import Header from './components/Header';
import ChartsList from './components/ChartsList';
import Container from 'react-bootstrap/Container';
import Col from 'react-bootstrap/Col';

function App() {
 

  return (
    <Container>
     <div className="App w-100">
     <Col>
      <Header />
      <ChartsList />

      </Col>
    </div>
    </Container>
  )
}

export default App
