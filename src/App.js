import logo from "./logo.svg";
import "./App.css";
import { WeatherApp } from "./components/WeatherApp";

function App() {
  return (
    <div className="App">
      <h1>My Weather App</h1>
      <WeatherApp />
    </div>
  );
}

export default App;
