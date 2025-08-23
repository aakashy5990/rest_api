// Load environment variables from .env file
require('dotenv').config();
const url = process.env.API;


async function getData(){
    try{
        console.log("API URL:", url);
        if (!url) {
            console.log("No API URL found in environment variables");
            return [];
        }
        const response = await fetch(url);
        const data = await response.json();
        console.log("Data fetched successfully:", data.length, "items");
        return data
    }catch(error){
        console.log("Error Fetching data",error);
        return [];
    }
}

module.exports = { getData };