import { Outlet } from 'react-router-dom';
import { Catfact } from '../../components/catfact/catfact';
import {TimerController} from '../../components/timer-controller/tiemer-controller';
import {TimeLine} from '../../components/timeline/timeline';
const Home = () => {
   
  
    return (
            <main>
                <div className="container" id="topArea">
                    <TimerController />
                    <TimeLine />

                </div>
            </main>
    );
  };
  
  export default Home;
  