import * as React from 'react';
import { useHistory } from 'react-router-dom';

import '../styles/index.css';

const Index = (props) => {
  const history = useHistory();
  const [query, setQuery] = React.useState({ username: '', room: '' });

  return (
    <div className="centered-form">
      <div className="centered-form__box">
        <h1>Join</h1>
        <form
          action="/chat.html"
          onSubmit={(evt) => {
            evt.preventDefault();
            history.push(`chat?username=${query.username}&room=${query.room}`);
          }}
        >
          <label>Display name</label>
          <input
            type="text"
            name="username"
            placeholder="Display name"
            required
            value={query.username}
            onChange={(evt) => {
              setQuery((prev) => ({ ...prev, username: evt.target.value }));
            }}
          />
          <label>Room</label>
          <input
            type="text"
            name="room"
            placeholder="Room"
            required
            value={query.room}
            onChange={(evt) => setQuery((prev) => ({ ...prev, room: evt.target.value }))}
          />

          <button>Join</button>
        </form>
      </div>
    </div>
  );
};

export default Index;
