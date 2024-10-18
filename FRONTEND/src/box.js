import React from 'react';
import './App.css'; // Import the CSS file for styling
import { Link } from 'react-router-dom';

function Box() {
  return (
    <div className="box">
      <h2>PLEASE SELECT THE ROOM</h2>
      <div className="button-container">
        <Link to="/rooms/1"><button>Room 1</button></Link>
        <Link to="/rooms/2"><button>Room 2</button></Link>
        <Link to="/rooms/3"><button>Room 3</button></Link>
        <Link to="/rooms/4"><button>Room 4</button></Link>
        <Link to="/rooms/5"><button>Room 5</button></Link>
        <Link to="/rooms/6"><button>Room 6</button></Link>
        <Link to="/rooms/7"><button>Room 7</button></Link> {/* Add new rooms */}
        <Link to="/rooms/8"><button>Room 8</button></Link>
        <Link to="/rooms/9"><button>Room 9</button></Link>
        <Link to="/rooms/10"><button>Room 10</button></Link>
      </div>
    </div>
  );
}

export default Box;
