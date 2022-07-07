import "./widgetSm.css";
import { Visibility } from "@material-ui/icons";
import { useEffect,useState } from "react";
import axios from 'axios'
import {BASE_URL} from '../../utils/Constant'

export default function WidgetSm() {

const [user, setUser] = useState([]);

  useEffect(()=> {
    const getUsers = async () => {
      const res = await axios.get(BASE_URL + '/user/all_information')
      setUser(res.data);
    };
    getUsers();
  },[]);

 const userpart =  user.map((newUser, id)=> {
   return (
    <li className="widgetSmListItem" key= {id}>
    
    <div className="widgetSmUser">
      <span className="widgetSmUsername">{newUser.name}</span>
      <span className="widgetSmUserTitle">{newUser.email}</span>
    </div>
    <button className="widgetSmButton">
      <Visibility className="widgetSmIcon" />
      Display
    </button>
  </li>
   )
  });

 

  return (
    <div className="widgetSm">
      <span className="widgetSmTitle">New Join Members</span>
      <ul className="widgetSmList">
      {userpart}
      </ul>
    </div>
  );
}
