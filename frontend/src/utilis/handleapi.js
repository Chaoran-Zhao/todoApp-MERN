import axios from 'axios'

const  baseurl = "http://localhost:5000"

const getAllToDo = (setToDo) => {
    axios
    .get(baseurl)
    .then(({data}) => {
        console.log('data-->', data);
        setToDo(data);
    })
    .catch((err) => console.log(err))
}

const addToDO = (text, description, group, behaviour, status, notification, emergency, time_period ) => {
    axios
    .post(`${baseurl}/save`,{text, description, group, behaviour, status, notification, emergency, time_period })
    .then((data) => {console.log(data);
    })
    .catch((err) => console.log(err))
}

const updateToDoStatus = (toDoId,status) => {
    axios
    .post(`${baseurl}/status`,{_id:toDoId,status:status})
    .then((data) => {console.log(data);
    })
    .catch((err) => console.log(err))
}

const deleteToDo = (toDoId) => {
    axios
    .post(`${baseurl}/delete`,{_id:toDoId })
    .then((data) => {console.log(data);
    })
    .catch((err) => console.log(err))
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
    })
    .catch((err) => console.log(err))
}

export {getAllToDo, addToDO, updateToDoStatus, deleteToDo, editToDo}