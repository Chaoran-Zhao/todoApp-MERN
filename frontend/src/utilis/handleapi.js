import axios from 'axios'
import { message } from 'antd';
import 'antd/dist/reset.css';

// helper function
function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}



// const  baseurl = "http://localhost:5000"

const  baseurl = "https://todoapp-backend-new.onrender.com"

const getAllToDo = (setToDo,loginUser) => {
    axios
    .get(`${baseurl}/todos`)
    .then(({data}) => {
        console.log('data-->', data);
        let userTodos = [];
        data.forEach(element => {
          if (element.userName === loginUser)  {
            userTodos.push(element)
          }else{
            if(element.attendent.length !== 0){
                element.attendent.forEach(att => {
                if (att === loginUser){
                    userTodos.push(element)
                }
            });
            }
            
          }
        });
        setToDo(userTodos);
    })
    .catch((err) => {console.log(err);
    message.error(`${err.message} has occurred`);})
}

const getEvent = (setAllEvent,loginUser) => {
    axios
    .get(`${baseurl}/todos`)
    .then(({data}) => {
        console.log('data-->', data);
        let userTodos = [];
        data.forEach(element => {
          const dt = new Date(element.time_period[0])
          const local_time = convertUTCDateToLocalDate(dt).toISOString()
          const date = local_time.split('T')[0]
          if (element.userName === loginUser)  {
            let tmp = {id: element._id,title: element.text, date:date }
            userTodos.push(tmp)
          }else{
            if(element.attendent.length !== 0){
                element.attendent.forEach(att => {
                if (att === loginUser){
                    let tmp = {id: element._id,title: element.text, date:date }
                    userTodos.push(tmp)
                }
            });
            }
            
          }
        });
        setAllEvent(userTodos);
        console.log(userTodos)
    })
    .catch((err) => {console.log(err);
    message.error(`${err.message} has occurred`);})
}

const getTodayToDo = (setToDo, loginUser) => {
    axios
    .get(`${baseurl}/todos`)
    .then(({data}) => {
        var today = new Date();
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy+'-'+ mm+'-'+dd;

        let today_data = []
        data.forEach(element => { 
            const dt = new Date(element.time_period[0])
            const local_time = convertUTCDateToLocalDate(dt).toISOString()
            const date = local_time.split('T')[0]
            if (date === today){
                let replace = {...element}
                replace.time_period = local_time;
                today_data.push(replace)
            }
        });

        let userTodos = [];
        today_data.forEach(e => {
          if (e.userName === loginUser)  {
            userTodos.push(e)
          }else{
            if(e.attendent !== []){
                e.attendent.forEach(att => {
                    if (att === loginUser){
                        userTodos.push(e)
                    }
                });
            }
          }
        });
        console.log('data-->',userTodos)
        setToDo(userTodos);
        
    })
    .catch((err) => {console.log(err);
        message.error(`${err.message} has occurred`);})
}

const addToDO = (userName,text, description, status, notification, emergency, time_period,color, attendent,navigate) => {
    
    axios
    .post(`${baseurl}/todos/save`,{userName, text, description, status, notification, emergency, time_period, color, attendent })
    .then((data) => {console.log(data);
        message.success('The new todo has been added');
        if (navigate !== undefined){
            navigate("/alltodos"); // NOT A GOOD OPTION AS WELL< compare with the refresh one later
        }
        
    })
    .catch((err) => {console.log(err);
        message.error(`${err.message} has occurred`);}
    ); 
}

const updateToDoStatus = (toDoId,status) => {
    axios 
    .post(`${baseurl}/todos/status`,{_id:toDoId,status:status})
    .then((data) => {console.log(data);
        message.success('The status has been updated');
    })
    .catch((err) => console.log(err))
}

const deleteToDo = (toDoId) => {
    axios
    .post(`${baseurl}/todos/delete`,{_id:toDoId })
    .then((data) => {console.log(data);
        message.success('The todo has been deleted');
    })
    .catch((err) => {console.log(err);
        message.error(`${err.message} has occurred`);})
}


const editToDo = (toDoId, text, description, emergency) => {
    let body = {"_id": toDoId};
    if (text !== ""){
        body["text"] = text;
    }
    if (description!== ""){
        body["description"] = description;
    }
    if (emergency !== ""){
        body["emergency"] = emergency;
    }
    console.log(body)
    axios
    .post(`${baseurl}/todos/update`,body)
    .then((data) => {console.log(data);
        message.success('The todo has been updated');
    })
    .catch((err) => {console.log(err);
        message.error(`${err.message} has occurred`);})
}




// auth api

export {getAllToDo, addToDO, updateToDoStatus, deleteToDo, editToDo, getTodayToDo, getEvent}