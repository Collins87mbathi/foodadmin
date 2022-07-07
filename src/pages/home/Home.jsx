import Chart from "../../components/chart/Chart";
import FeaturedInfo from "../../components/featuredInfo/FeaturedInfo";
import "./home.css";
import WidgetSm from "../../components/widgetSm/WidgetSm";
import {BASE_URL} from '../../utils/Constant'
import axios from 'axios'
import { useEffect,useState } from "react";
export default function Home() {
  const [user, setUser] = useState([]);

  useEffect(()=> {
    const getUsers = async () => {
      const res = await axios.get(BASE_URL + '/user/all_information')
      setUser(res.data);
    };
    getUsers();
  },[]);



  return (
    <div className="home">
      <FeaturedInfo />
      <Chart data={user} title="User Analytics" grid dataKey="Active User"/>
      <div className="homeWidgets">
        <WidgetSm/>
      </div>
    </div>
  );
}
