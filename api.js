const url = "https://jsonplaceholder.typicode.com/users";

async function getData(){
    try{
        const response = await fetch(url);
        const data = await response.json();
        return data
    }catch(error){
        console.log("Error Fetching data",error);
    }
}

module.exports = { getData };