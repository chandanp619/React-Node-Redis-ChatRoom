import React, { useEffect , useState} from 'react'
import HeaderComponent from './HeaderComponent';
import FooterComponent from './FooterComponent';
import { useNavigate } from 'react-router';
import { io } from 'socket.io-client';

export default function HomeComponent() {
  const navigate = useNavigate();
  const [demo,setDemo] = useState(false);
  const [channels, setChannels] = useState([]);
  const [newChannelName, setNewChannelName] = useState("");
  const [user] = useState(() => localStorage.getItem("user_name") || "");
  const [selectedChannel, setSelectedChannel] = useState("");
  const [socket] = useState(() => io('http://localhost:8083'));

  useEffect(() => {
      
      if(!user){
        navigate("/login");
      }

      socket.connect(); 

      socket.on('channels', (data) => {
        setChannels((prev) => {
          let arr = [...prev, ...data];
          let newSet = new Set(arr);
          arr = Array.from(newSet);
          return arr;});
      });

      return () => {
        socket.disconnect();
      };

  },[channels]);  

  const getChannels = async() => {
    socket.emit('get-channels',{});
    setDemo(true);
  }

  const renderChannels = () => {
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

  const addNewChannel = ()=>{
    socket.emit('add-channel', {channel: newChannelName, message: newChannelName});
    setDemo(true);
  }

  return (
    <div className='home container-fluid'>
      <HeaderComponent />

      <div className='row body'>
      <div className='col-12'>
          <div>&nbsp;</div>
          <p>Add New Channel</p>
          <input type='text' placeholder='Channel Name' className='form-control' onChange={(e) => setNewChannelName(e.target.value)}/>
          <div>&nbsp;</div>
          <button className='btn btn-primary' onClick={addNewChannel}>Add</button>
          <div>&nbsp;</div>
        </div>
        <div className='col-12'>
          <button className='btn btn-primary' onClick={getChannels}>Get Channels</button>
          <div>&nbsp;</div>
          {channels.length > 0 ?
          <select name='channles' multiple onChange={(e) => updateSelectedChannel(e.target.value)}>
          {renderChannels()}
          </select>
          :null
          }
          <div>&nbsp;</div>
          <button className='btn btn-primary' onClick={join_channel}>Join</button>
        </div>
       
      </div>

      <FooterComponent />
    </div>
  )
}
