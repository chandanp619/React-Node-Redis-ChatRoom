import React, { useEffect , useState} from 'react'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

export default function HomeComponent() {
  const navigate = useNavigate();
  const [demo,setDemo] = useState(false);
  const [channels, setChannels] = useState([]);
  const [user] = useState(() => localStorage.getItem("user_name") || "");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [socket] = useState(() => io('http://localhost:8083'));

  useEffect(() => {
      
      if(!user){
        navigate("/login");
      }

      socket.connect(); 

      socket.on('channels', (data) => {
        setChannels(data);
      });

      return () => {
        socket.disconnect();
      };

  },[channels]);  

  const getChannels = async() => {
    socket.emit('get-channels',{});
    setDemo(true);
  }

  const renderChannels = (channels) => {
    return channels.map((channel,key) => {
      return (
        <option value={channel} key={key}>{channel}</option>
      )
    })
  }

  const join_channel = async() => {
    localStorage.setItem("selected_channel", selectedChannel);
    navigate("/rooms/?channel="+selectedChannel);
  }

  const updateSelectedChannel = (channel) => {
    setSelectedChannel(channel);
  }

  return (
    <div className='home container-fluid'>
      <HeaderComponent />

      <div className='row body'>
        <div className='col-12'>
          <h1>Home</h1>
          <button className='btn btn-primary' onClick={getChannels}>Get Channels</button>
          <br/>
          <br/>
          <div>&nbsp;</div>
          <select name='channles' multiple onChange={(e) => updateSelectedChannel(e.target.value)}>
          {channels.length > 0 && renderChannels(channels)}
          </select>
          <br/>
          <button className='btn btn-primary' onClick={join_channel}>Join</button>
        </div>
      </div>

      <FooterComponent />
    </div>
  )
}
