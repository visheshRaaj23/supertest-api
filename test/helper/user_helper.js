const superTest = require("supertest");
const baseURI = "https://gorest.co.in/public/v1/";
var request = superTest(baseURI);
var userDetails = {}; 
     const createRandomUser = async(TOKEN)=>{
    let addUser = {
        name:"Ruksana Shaikh"+Math.floor(Math.random()*9999),
        gender:"female", 
        email:`shaikh.Ruksana${Math.floor(Math.random()*9999)}@15ceabcdefgmail.com`, 
        status:"Active"
    }
        let constructPayload = Object.assign({},JSON.parse(JSON.stringify(addUser)));
         let response =await  request.post("users").set('Authorization',`Bearer ${TOKEN}`).send(constructPayload).expect(201)
        .expect("Content-Type",/json/);
        userDetails["id"]=response.body.data.id;
        userDetails["name"]=response.body.data.name;
        return userDetails;
}
module.exports = createRandomUser;