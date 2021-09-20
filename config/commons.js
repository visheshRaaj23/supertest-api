const superTest = require("supertest");
const qa = require("./qa");
var baseUrI = qa.baseURI;
var request = superTest(baseUrI);

module.exports=request;