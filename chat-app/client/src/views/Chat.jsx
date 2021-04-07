import * as React from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import io from 'socket.io-client';
import moment from 'moment';

import '../styles/chat.css';
import SidebarTemplate from '~/components/SidebarTemplate';
import MessageTemplate from '~/components/MessageTemplate';
import LocationMessageTemplate from '~/components/LocationMessageTemplate';

let socket;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Chat = () => {
  const history = useHistory();
  const query = useQuery();

  const [chatState, setChatState] = React.useState({
    messageFormButtonDisabled: false,
    sendLocationButtonDisabled: false,
    messageFormInput: '',
    room: query.get('room'),
  });

  const [messages, setMessages] = React.useState([]);
  const [sidebarUsers, setSidebarUsers] = React.useState([]);

  const $messages = React.useRef(null);
  const $message = React.useRef(null);
  const messagesEndRef = React.useRef(null);

  const scrollToBottom = React.useCallback(() => {
    const scroll = $messages.current.scrollHeight - $messages.current.clientHeight;
    $messages.current.scrollTo(0, scroll);
  }, []);

  React.useEffect(
    () => {
      socket = io('/');
      const username = query.get('username');
      const room = query.get('room');

      socket.on('message', (message) => {
        console.log(message);
        const messageTemplate = {
          username: message.username,
          message: message.text,
          createdAt: moment(message.createdAt).format('h:mm a'),
          type: 'text',
        };
        setMessages((prev) => [...prev, messageTemplate]);
        scrollToBottom();
      });

      socket.on('locationMessage', (message) => {
        console.log(message);
        const messageTemplate = {
          username: message.username,
          url: message.url,
          createdAt: moment(message.createdAt).format('h:mm a'),
          type: 'location',
        };
        setMessages((prev) => [...prev, messageTemplate]);
        scrollToBottom();
      });

      socket.on('roomData', ({ room, users }) => {
        setSidebarUsers(users);
      });

      socket.emit('join', { username, room }, (error) => {
        if (error) {
          alert(error);
          history.replace('/');
        }
      });
      return () => {
        socket.close();
      };
    },
    // eslint-disable-next-line
    [],
  );

  const submitSendMessage = (e) => {
    e.preventDefault();

    setChatState((prev) => ({ ...prev, messageFormButtonDisabled: true }));

    const message = e.target.elements.message.value;

    socket.emit('sendMessage', message, (error) => {
      setChatState((prev) => ({ ...prev, messageFormButtonDisabled: false, messageFormInput: '' }));
      $message.current.focus();

      if (error) {
        return console.log(error);
      }

      console.log('Message delivered!');
    });
  };

  const handleClickSendLocation = () => {
    if (!navigator.geolocation) {
      return alert('Geolocation is not supported by your browser.');
    }

    setChatState((prev) => ({ ...prev, sendLocationButtonDisabled: true }));

    navigator.geolocation.getCurrentPosition((position) => {
      socket.emit(
        'sendLocation',
        {
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        },
        () => {
          setChatState((prev) => ({ ...prev, sendLocationButtonDisabled: false }));
          console.log('Location shared!');
        },
      );
    });
  };

  return (
    <>
      <div className="chat">
        <div id="sidebar" className="chat__sidebar">
          <SidebarTemplate room={chatState.room} users={sidebarUsers} />
        </div>
        <div className="chat__main">
          <div id="messages" className="chat__messages" ref={$messages}>
            {messages.map((item, idx) => (
              <React.Fragment key={idx}>
                {item.type === 'text' && <MessageTemplate {...item} />}
                {item.type === 'location' && <LocationMessageTemplate {...item} />}
              </React.Fragment>
            ))}
            <div ref={messagesEndRef} />
          </div>

          <div className="compose">
            <form id="message-form" onSubmit={submitSendMessage}>
              <input
                name="message"
                placeholder="Message"
                required
                autoComplete="off"
                value={chatState.messageFormInput}
                onChange={(e) =>
                  setChatState((prev) => ({ ...prev, messageFormInput: e.target.value }))
                }
                ref={$message}
              />
              <button disabled={chatState.messageFormButtonDisabled}>Send</button>
            </form>
            <button
              id="send-location"
              disabled={chatState.sendLocationButtonDisabled}
              onClick={handleClickSendLocation}
            >
              Send location
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Chat;
