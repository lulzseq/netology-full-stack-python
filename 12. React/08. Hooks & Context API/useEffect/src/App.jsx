import React, { useState, useEffect } from 'react';
import './App.css';
import List from './components/List';
import Details from './components/Details';

function App() {
  const [data, setData] = useState([]);
  const [selectedItem, setSelectedItem] = useState(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch('https://raw.githubusercontent.com/netology-code/ra16-homeworks/master/hooks-context/use-effect/data/users.json')
      .then(response => response.json())
      .then(data => setData(data))
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <h1>Loading...</h1>;
  }

  return (
    <table style={{ width: '100%' }}>
      <tr>
        <td>
          <List data={data} selectedItem={selectedItem} onItemClick={item => setSelectedItem(item)} />
        </td>
        <td width={'30%'}></td>
        <td style={{ verticalAlign: 'top' }}>
          {selectedItem && <Details info={selectedItem} />}
        </td>
      </tr>
    </table>
  );
}

export default App;
