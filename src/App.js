
import './App.css';
import axios from 'axios';
import { useEffect, useState } from 'react';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';



function App() {

  const [weatherData, setWeatherData] = useState([]);
  const [city, setCity] = useState('');
  const [loading, setLoading] = useState(false);


  //Make api call to openweathermap api
  async function getWeatherData() {
    //Set loading boolean to true so that we know to show loading text
    setLoading(true);

    //set latitude and longitude for specific location
    const latitude = '40.712776';
    const longitude = '-74.005974';

    //set your api key here
    const apiKey = '';

    //Make weather api call using axios
    const resp = await axios.get(`https://api.openweathermap.org/data/2.5/forecast?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=imperial`);
    setWeatherData(resp.data.list);
    setCity(resp.data.city.name);

    //Set loading boolean to false
    setLoading(false);
  }

  useEffect(() => {
    getWeatherData();
  }, []);



  return (
    <>

      {loading ? "Loading..." : <Container>
        <Row className="d-flex">
          <div className='text-center mt-3'>
            <h3>
              Weather in {city}
            </h3>
          </div>

          {weatherData.map((weatherData, index) =>
            <Col sm={4} className="mt-3" key={index}>
              <Card className="p-3 shadow border-0 mt-3 rounded">
                <div className='d-flex justify-content-between'>
                  <div>
                    {weatherData.dt_txt}
                  </div>
                  <div>
                    Current: {weatherData.main.temp}
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <img src={`http://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`} />
                </div>
                <div className='d-flex justify-content-between'>
                  <div>
                    {weatherData.weather[0].description}
                  </div>
                  <div>
                    Feels like  {weatherData.main.feels_like}
                  </div>
                </div>
              </Card>
            </Col>
          )}
        </Row>

      </Container>
      }

    </>
  );
}

export default App;