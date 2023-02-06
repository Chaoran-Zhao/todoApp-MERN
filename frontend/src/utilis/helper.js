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

export function fileToDataUrl(file) {
    const validFileTypes = [ 'image/jpeg', 'image/png', 'image/jpg' ]
    const valid = validFileTypes.find(type => type === file.type);
    // Bad data, let's walk away.
    if (!valid) {
        throw Error('provided file is not a png, jpg or jpeg image.');
    }
    
    const reader = new FileReader();
    const dataUrlPromise = new Promise((resolve,reject) => {
        reader.onerror = reject;
        reader.onload = () => resolve(reader.result);
    });
    reader.readAsDataURL(file);
    return dataUrlPromise;
}
