export function setItemFromLocalStorage(key , value){  
    try{
        window.localStorage.setItem(key,JSON.stringify(value)); 
    }
    catch(error){
        console.log(error);
    }
}

export function getItemFromLocalStorage(key){
    try{
         return  window.localStorage.getItem(key);
    }
    catch(error){
        console.log(error);
    }
}

export function removeItemFromLocalStorage(key){
    try{
        window.localStorage.removeItem(key);
    }
    catch(error){
        console.log(error);
    }
}


 
 
