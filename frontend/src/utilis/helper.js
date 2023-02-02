export const convertUTCDateToLocalDate=(date) =>{
    var newDate = new Date(date.getTime() - date.getTimezoneOffset()*60*1000);
    
    return newDate;   
}

export const differenceInDays = (a, b) => {
    if (Math.floor((a.getTime() - b.getTime())) < 3600000 && Math.floor((a.getTime() - b.getTime())) > 0){
        return true;
    }else{
        return false;
    }
}