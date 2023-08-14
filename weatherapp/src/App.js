import Weather from "./Weather";
import Footer from "./Footer";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Weather defaultCity="Tehran" />
      <Footer />
    </div>
  );
}

export default App;
