import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';
import {timeformat, nowformat} from '../../utils/timeutiles';

export const TimeLine = () =>{
    const { setCurrentUser,currentUser,userlogs,addItemToLogs} = useContext(UserContext);
    console.log( userlogs)
    
    const taskrow = (curTask) => {
        let newrow = "";
        let zo = NaN;
        
        if(Number.isNaN(zo)){
            zo = curTask.zone;
        }
        return(<tr key={curTask._id}> 
            <th>{curTask.taskname}</th><th>{curTask.category}</th><th>{timeformat(curTask.ini,zo)}</th>
            <th>{ timeformat(curTask.ss,zo)}</th><th> {nowformat(String(curTask.ss - curTask.ini))}</th> 
            </tr>)  
          
    }
    return (
        <div className="table-responsive" id="mytable">
        <table className="table table-striped table-sm">
          <thead key="tablehead">
            <tr key="tabletitle">
              <th>Name</th>
              <th>Category</th>
              <th>Start Time</th>
              <th>Stop Time</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody id="tablein">
          {Array.isArray(userlogs) && userlogs.map(taskrow)}
            

          </tbody>
        </table>
      </div>
    )

}

export default TimeLine;