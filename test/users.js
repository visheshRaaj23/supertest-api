var request = require("../config/commons");
const {expect} = require('chai');
require('dotenv').config();
const TOKEN = process.env.USER_TOKEN;

describe('/users Test the API"s for GET, POST, PUT,DELETE',async() =>{

    it.skip('/users GET',() =>{
        //(done) =>{
        //  request.get(`users?access-token=${TOKEN}`).end((err,res) =>{
        //     console.log(res.body);
        //     expect(res.body.data).not.to.be.empty;
        //     console.log(err);
        //     done();
        // });

        return request.get(`users?access-token=${TOKEN}`).then(result =>{
            console.log(result.body);
            expect(result.body.data).not.to.be.empty;
        });
    });

    it.skip('/users:id /GET', (done) =>{
            request.get(`users/38?access-token=${TOKEN}`).end((err,res) =>{
                console.log(res.body);
                expect(res.body.data.id).to.be.eq(38);
                expect(res.body.data.status).to.be.equal("active");
                done();
            });

    });
   
    it.skip('/users/:id /GET using filter',(done) =>{
        request.get(`users?access-token=${TOKEN}&gender=female&status=inactive`).end((err,res) =>{
                console.log(res.body);
               console.log(res.body.data.length);
               res.body.data.forEach(element => {
                        expect(element.gender).to.be.eq("female");
                        expect(element.status).to.be.eq("inactive");
               });
               done();
        });
    });

    it.skip('/users/:id /GET for multiple IDs',async() =>{
            var s,_Ids = [70,72,30,2721];
            for(s of _Ids){
                return await  request.get(`users/${s}?access-token=${TOKEN}`).expect('Content-Type',/json/).expect(200).then((res) =>{
                            console.log(res.body);
                            console.log(s);
                            expect(res.body.data.id).to.be.eq(s);
                        
                });
            }
    });

    it.skip('/users POST',async()=>{
       // var payload = {};
       let payloadPath = require("../request payload/post_user.json");
                console.log(JSON.stringify(payloadPath));
                console.log(JSON.parse(JSON.stringify(payloadPath)));
                var payload_addUsers = Object.assign({},JSON.parse(JSON.stringify(payloadPath)));
            await request.post("users").set('Authorization',`Bearer ${TOKEN}`).send(payload_addUsers).expect(201)
            .expect('Content-Type',/json/).then((res) =>{
                console.log(res.body);
                console.log(res.statusCode);
                expect(res.statusCode).to.be.eq(201);
                expect(res.body.data.gender).to.be.eq(payload_addUsers.gender);                                                                                                                        
                expect(res.body.data).to.deep.include(payload_addUsers.data);
                //Those are the updates from my end
            });
    });
    var id=0;
    it('/users POST and DELETE',async() =>{
            let payload = {
                "name":`Shaikh_Ruksana${Math.floor(Math.random()*9999)}`,
                 "gender":"Female",
                 "email":`shaikh.ruksana${Math.floor(Math.random()*9999)}@15ceabcdefg.com`,
                  "status":"Active"
        }
        
        var payload_addUsers = Object.assign({},JSON.parse(JSON.stringify(payload)));
            return await request.post("users").set("Authorization",`Bearer ${TOKEN}`).send(payload_addUsers).expect(201).expect("Content-Type",/json/)
            .then((response) =>{
                    console.log(response.body);
                    id = response.body.data.id;
                    expect(response.status).to.be.eq(201);
            });
    });

    it("/users DELETE",(done) =>{
             request.delete("users/"+id).set("Authorization",`Bearer ${TOKEN}`).end((error,response) =>{
                console.log(response.status);
                expect(response.status).to.be.eq(204);
                console.log(error);
                done();
            });     
    });


    it.skip('/PUT /users/:id',async() =>{
            const payload = {
                    "gender": "Female",
                    "status": "Active",
                    "name": `Raaju-${Math.floor(Math.random()*9999)}`,
                    "email":`pres_chidaatma_mishra_${Math.floor(Math.random()*9999)}@global.biz.in`
            }
           return await request.put("users/40").set("Authorization",`Bearer ${TOKEN}`).send(payload)
            .expect(200).then((res) =>{
                console.log(res.body);
                expect(res.status).to.be.eq(200);
            });

          
    });

});


