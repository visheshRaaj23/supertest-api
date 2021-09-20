
const {expect} = require("chai");
const createRandomUser = require("./helper/user_helper");
var request = require("../config/commons.js");
var faker = require("faker");
require("dotenv").config();
var userId,postId;
const TOKEN = process.env.USER_TOKEN; 

before(async() =>{
    var userArray = await createRandomUser(TOKEN);
    userId = userArray.name;
    postId = userArray.id;
});
    describe("User Posts",() =>{
        var payload = {
            "user_id":userId,
            "title":faker.lorem.sentence(),
            "body":faker.lorem.paragraph()
        };
        var payloadAddPost = Object.assign({},JSON.parse(JSON.stringify(payload)));
        it("/POST /posts",async() =>{
            console.log(userId);
            console.log(postId);
            return await request.post(`users/${postId}/posts`).set('Authorization',`Bearer ${TOKEN}`).send(payloadAddPost)
            .expect(201).expect("Content-Type",/json/).then((response) =>{
                console.log(response.body);
                expect(response.statusCode).to.be.eq(201);
            });
        });
        it("/GET /posts/:id",async() =>{
                return await request.get(`users/${postId}/posts`).set('Authorization',`Bearer ${TOKEN}`).expect(200).
                expect("Content-Type",/json/).then((response) =>{
                    console.log(response.body);
                    console.log(response.statusCode);
                });
        });

        describe("Negative Tests",async() =>{
            it("/POST /posts",async() =>{
                return await request.post(`users/${postId}/posts`).set('Authorization',`Bearer ${TOKEN}`).send("")
                .expect(422).expect("Content-Type",/json/).then((response) =>{
                    console.log(response.body);
                    expect(response.statusCode).to.be.eq(422);
                });
            });  
            it("/POST /posts",async() =>{
                return await request.post(`users/420 /posts`).set('Authorization',`Bearer ${TOKEN}`).send("")
                .expect(422).expect("Content-Type",/json/).then((response) =>{
                    console.log(response.body);
                    expect(response.statusCode).to.be.eq(422);
                });
            }); 
            it("/POST /posts Invalid AuthToken",async() =>{
                return await request.post(`users/420 /posts`).set('Authorization',`Bearer ${TOKEN}`).send("")
                .expect(422).expect("Content-Type",/json/).then((response) =>{
                    console.log(response.body);
                    expect(response.statusCode).to.be.eq(422);
                }); 
        });
        it("/POST /posts Invalid AuthToken",async() =>{
            return await request.post(`users/${postId}/posts`).set('Authorization',`Bearer 524e7c5609e5837a058dvfvjkwbef84ad942d7d76e70b35becff4cfdd488de23681ef46`).send(payload)
            .expect(401).expect("Content-Type",/json/).then((response) =>{
                console.log(response.body);
                expect(response.statusCode).to.be.eq(401);
            }); 
    });
    
    });

    });
