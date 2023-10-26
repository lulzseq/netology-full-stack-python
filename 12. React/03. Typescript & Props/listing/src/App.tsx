import './App.css';
import jsonData from './assets/data.json';
import Listing from './components/Listing';

function App() {
  return (
    <>
      {jsonData.map((item) => (
        <Listing key={item.listing_id} item={item} />
      ))}
    </>
  );
}

export default App;
