import * as bodyParser from "body-parser";
import * as express from "express";
import { Request, Response } from "express";
import * as http from 'http';
var nano = require('nano')('http://localhost:5984'); // Connect to the CouchDB running on port 5984
var db_name = 'test'; // The name of the database to connect to
var db = nano.use(db_name);


var app:express.Application = express();

app.get('/', (req: Request, res: Response) => {

   
  res.status(200).json({status: "ok"});
});

app.get('/testDb',(req: Request, res: Response) => {
  db.list({ include_docs: true }, function(err, body){
		res.send(body);
	});
});


let httpPort = 3000;
app.set("port", httpPort);
var httpServer = http.createServer(app);

//listen on provided ports
httpServer.listen(httpPort, (data) => {
  console.log(`Listening on port ${httpPort}`)
});