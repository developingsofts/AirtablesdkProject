import {
  Heading,
  IconButton,
  VStack,
  useColorMode,
  useToast,
} from "@chakra-ui/react";
import TaskList from "./components/tasks";
import AddTask from "./components/AddTask";
import { FaSun, FaMoon } from "react-icons/fa";
import { useState, useEffect } from "react";

function App() {
  
  
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [tasks, setTasks] = useState([]);

  const getToDoList=async()=>{
    fetch('https://api.airtable.com/v0/appdVn7JLNCM4X7TT/ToDoList?api_key=keyAC0Xixg5V0AgFU')
    .then((resp) => resp.json())
    .then(data => {
    console.log('GetData.response==', JSON.stringify(data?.records))
    setTasks(data?.records)
    }).catch(err => {
      
    });
  
  }
  useEffect(()=>{
    getToDoList()
  },[])
  const createTask=async(task)=>{
    console.log('payload==', task?.body)
    const requestOptions = {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' ,'Authorization':'Bearer keyAC0Xixg5V0AgFU'},
      body: JSON.stringify({
        "fields": {'TaskName': task?.body}
      })
  };
    fetch('https://api.airtable.com/v0/appdVn7JLNCM4X7TT/ToDoList',requestOptions)
    .then((resp) => resp.json())
    .then(data => {
    console.log('createTask.response==', JSON.stringify(data))
    addTask(data)
  
    }).catch(err => {
      console.log('createTask.errro==', err)
    });
  }
  
  const updateTask=async(task, onClose)=>{
     //tasks[selectedIndex] = task

   onClose();
    const requestOptions = {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' ,'Authorization':'Bearer keyAC0Xixg5V0AgFU'},
     body:JSON.stringify({
      "fields": {
        "TaskName": task?.fields?.TaskName
      }
    })
  };
   fetch('https://api.airtable.com/v0/appdVn7JLNCM4X7TT/ToDoList/'+task?.id,requestOptions)
    .then((resp) => resp.json())
    .then(data => {
    console.log('updateTask.response==', JSON.stringify(data))
    getToDoList()
    // setTimeout(()=>{
    //   setTasks([...tasks])
    // },100)
    //addTask(data)
  
    }).catch(err => {
      console.log('updateTask.errror==', err)
    });
  }

  const selectedTaskIndex=(index)=>{
    setSelectedIndex(index)
    console.log('selectedTaskIndex===',index)
  }





  function deleteTask(id,onClose) {
    onClose()
    console.log('deleteTask===',id)
    const requestOptions = {
      method: 'DELETE',
      headers: { 'Authorization':'Bearer keyAC0Xixg5V0AgFU'},
    
  };
  console.log('updateTask.payload==',requestOptions )
    fetch('https://api.airtable.com/v0/appdVn7JLNCM4X7TT/ToDoList/'+id,requestOptions)
    .then((resp) => resp.json())
    .then(data => {
    console.log('deleteTask.response==', JSON.stringify(data))
    const newTasks = tasks.filter((task) => {
      return task.id !== id;
    });
    setTasks(newTasks);
  
    }).catch(err => {
      console.log('deleteTask.errro==', err)
    });
  
   
  }


  function deleteTaskAll() {
    setTasks([]);
  }


  

  function addTask(task) {
    setTasks([task,...tasks]);
    console.log('createTask.tasks==', JSON.stringify(tasks))
  }

 

  return (
    <VStack background={'gray'} p={4} minH='100vh' pb={23}>
     
      <AddTask 
    
      addTask={createTask}
      />
      <TaskList
      selectedTaskIndex={selectedTaskIndex}
        tasks={tasks}
        updateTask={updateTask}
        deleteTask={deleteTask}
        deleteTaskAll={deleteTaskAll}
       // checkTask={checkTask}
      />
    </VStack>
  );
}

export default App;
