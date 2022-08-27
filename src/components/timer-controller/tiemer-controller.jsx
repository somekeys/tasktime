import { useState, useContext } from 'react';
import { UserContext } from '../../contexts/user.context';


const defaultCurTask = {
    taskname: '',
    category: '',
    ini: -1
};


const interid = -1

export const TimerController = () => {
  const [curTask, setCurTask] = useState(defaultCurTask);
  const { taskname, category, ini} = curTask;
  const [running, setRunning] = useState(false)
  const [interid,setInterid] = useState(-1)
  const [passed, setPassed] = useState(0)

  

  const { currentUser ,setCurrentUser,userlogs,addItemToLogs } = useContext(UserContext);



  const start= () =>{
    console.log("start")

    if (taskname) {
      if (running) {
        alert("Please fisrt stop current task");
        return;
      }
      if (!category) {
        curTask.category = "Default";
      }
      curTask.ini = Date.now();
      setCurTask(curTask)
      setInterid (setInterval(
        function () {
          setPassed(Date.now() - curTask.ini)
        }, 1000
      ));
       setRunning(true);
    } else {
      alert("require task name")
    }

  }



  const stop= ()=> {
    console.log("stop")

    if (running) {
      clearInterval(interid)
      setRunning(false)

      setPassed(0);
      curTask.ss = Date.now();
      curTask.zone = new Date().getTimezoneOffset();

      
      addItemToLogs(curTask);
      return true;

    } else {
      alert("nothing is running")
      return false;
    }
  }

  const nowformat = (mills) => {
    var text = "";
    text += Math.floor(mills / (1000 * 60 * 60)) + "h";
    text += Math.floor(mills % (1000 * 60 * 60) / (1000 * 60)) + "m";
    text += Math.floor(mills % (1000 * 60 * 60) % (1000 * 60) / (1000)) + "s";
    return text;
  
  }
  const handleChange = (event) => {
    const { name, value } = event.target;
    console.log(curTask);

    setCurTask({ ...curTask, [name]: value });
  };

  return (
    <div className='timer-contoller'>
      <h2 className="titlename" id="headname"> {running && ("◉ " + taskname)}</h2>
      <hr/>
      <h1 className="time" id="mytimer">{nowformat(passed)}</h1>
      <br></br>
     
      <form>
        Name :  &nbsp;
        <input disabled={running} type="text" name="taskname" value={taskname}    onChange={handleChange}
 />  
       &nbsp;&nbsp; Category:&nbsp;
        <input disabled={running} type="text" name="category" value={category} onChange={handleChange}/><br /><br />
        <input type="button" className="btn btn-primary" id="startButton" value="start" onClick={start}  />  &nbsp;
        <input type="button" className="btn btn-secondary" id="stopButton" value="stop" onClick={stop}  /><br /><br />

      </form>
 
    </div>
  );
};



export default TimerController;
