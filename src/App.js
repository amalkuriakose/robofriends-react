import './App.css';
import { useState, useEffect } from 'react';
import CardList from './components/CardList'
import SearchBox from './components/SearchBox'

function App() {
  const [robots, setRobots] = useState([]);
  const [searchfield, setSearchfield] = useState('');

  async function getUsers() {
    await fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(users => setRobots(users));
  }

  useEffect(() => {
    getUsers();
  }, []);

  const onSearchChange = (event) => {
    setSearchfield(event.target.value)
  }

  const filteredRobots = robots.filter(robot => {
    return robot.name.toLowerCase().includes(searchfield.toLowerCase());
  })

  return (
    !robots.length ?
      <h1>Loading</h1> :
      (
        <div className='tc'>
          <h1 className='f1'>RoboFriends</h1>
          <SearchBox searchChange={onSearchChange} />
          <CardList robots={filteredRobots} />
        </div>
      )
  );
}

export default App;
