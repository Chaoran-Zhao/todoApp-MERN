import axios from 'axios'
import { message } from 'antd';
import 'antd/dist/reset.css';


// helper function
function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    return newDate;   
}



const  baseurl = "http://localhost:5000"

const getAllToDo = (setToDo) => {
    axios
    .get(baseurl)
    .then(({data}) => {
        console.log('data-->', data);
        setToDo(data);
    })
    .catch((err) => {console.log(err);
    message.error(`${err.message} has occurred`);})
}

const getTodayToDo = (setToDo) => {
    axios
    .get(baseurl)
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
        setToDo(today_data);
        
    })
    .catch((err) => {console.log(err);
        message.error(`${err.message} has occurred`);})
}

const addToDO = (text, description, group, behaviour, status, notification, emergency, time_period,navigate) => {
    
    axios
    .post(`${baseurl}/save`,{text, description, group, behaviour, status, notification, emergency, time_period })
    .then((data) => {console.log(data);
        message.success('The new todo has been added');
        navigate("/alltodos"); // NOT A GOOD OPTION AS WELL< compare with the refresh one later
    })
    .catch((err) => {console.log(err);
        message.error(`${err.message} has occurred`);}
    );
    
}

const updateToDoStatus = (toDoId,status) => {
    axios 
    .post(`${baseurl}/status`,{_id:toDoId,status:status})
    .then((data) => {console.log(data);
        message.success('The status has been updated');
    })
    .catch((err) => console.log(err))
}

const deleteToDo = (toDoId) => {
    axios
    .post(`${baseurl}/delete`,{_id:toDoId })
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
    .post(`${baseurl}/update`,body)
    .then((data) => {console.log(data);
        message.success('The todo has been updated');
    })
    .catch((err) => {console.log(err);
        message.error(`${err.message} has occurred`);})
}

export {getAllToDo, addToDO, updateToDoStatus, deleteToDo, editToDo, getTodayToDo}