var request = require("../config/commons.js");
const {expect} = require('chai');
var faker = require("faker");
require('dotenv').config();

describe("/POST /GET /PUT /DELETE Users",() =>{

    var UserId;
    const TOKEN = process.env.USER_TOKEN;
    describe("/POST /users",() =>{
        let addUser = {
            name:"KorviSriRamakrishna"+Math.floor(Math.random()*9999),
            gender:"male", 
            email:`korvi.sriramakrishna${Math.floor(Math.random()*9999)}@15ceabcdefgmail.com`, 
            status:"Active"
        }
        let addUserWithFaker = {
            name:faker.internet.email(),
            gender:"female", 
            email:`korvi.sriramakrishna${Math.floor(Math.random()*9999)}@15ceabcdefgmail.com`, 
            status:"Active"
        }
        it("/POST /users",async() =>{
            let constructPayload = Object.assign({},JSON.parse(JSON.stringify(addUser)));
            await request.post("users").set('Authorization',`Bearer ${TOKEN}`).send(constructPayload).expect(201)
            .expect("Content-Type",/json/).then((response) =>{
                    console.log(response.body);
                    UserId = response.body.data.id;
                    console.log("UserID:"+UserId);
                    expect(response.body).to.be.not.empty;
                    expect(response.body.data.name).to.be.eq(addUser.name);
            }).catch((error) =>{
                console.log(error.message);
            })
        });
        it("/GET/:user users",async() =>{
            await request.get(`users/${UserId}`).set("Authorization",`Bearer ${TOKEN}`).expect(200).expect("Content-Type","/json/").then((response) =>{
                expect(response.body).not.to.be.empty;
                expect(response.body.data.id).to.be.eq(UserId);
                expect(response.body.data.length).to.be.eq(5);
            }).catch((error) =>{
                new Error("Found new "+error.message);
            });

        });
        it("/GET All /users",async() =>{
            const response=request.get("users").set("Authorization",`Bearer ${TOKEN}`).expect(200).expect("Content-Type",/json/);
            response.then((response) =>{    
                let dataReturned = response.body.data;
                for(let match of dataReturned){
                    if(match.id===UserId){
                        console.log(UserId);
                        console.log("Record found in the payload /users");
                        break;
                    }else{
                        continue;
                    }
                }    
            }).catch((error) =>{
                    console.log(error.message);
            });
        });
        it("/PUT users",async() =>{
            const payload = {
                "gender": "Female",
                "status": "Inactive"
        }
            let modifyUserPayload = Object.assign({},JSON.parse(JSON.stringify(payload)));
            console.log(`userID:${UserId}`);
            await request.put(`users/${UserId}`).set("Authorization",`Bearer ${TOKEN}`).
            send(modifyUserPayload).expect("Content-Type",/json/).then((response) =>{
                console.log(response.body.data);
                console.log(response.statusCode);
                // expect(response.body.data.gender).to.be.eq((JSON.parse(payload)).gender);
                // expect(response.body.data.status).to.be.eq(payload.status);
            })
        });

        it("/DELETE users",async() =>{
            return await request.delete(`users/${UserId}`).set("Authorization",`Bearer ${TOKEN}`).expect(200).expect("Content-Type",/json/)
            .then((response) =>{
                console.log(response.statusCode);
            }).catch((error) =>{
                console.log(error.message);
            });
        });
    }); 
});