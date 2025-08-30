const { getData } = require("../api");

exports.getnusers =  async (req,res) => {
    try{
        console.log("Fetching data from API...");
        const data  = await getData();
        // console.log("Data received:", data);
        if (!data) {
            console.log("data is empty", data)
            return res.render("nextapi", {data: [] });
        }
        // return res.json(data);
        return res.render("nextapi", { data });
    }
    catch(error){
        console.log("Error in route:", error);
        return res.render("nextapi", { data: [] });
    }
}