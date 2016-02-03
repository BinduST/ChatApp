var pg = require('pg');
var conString = "postgres://postgres:!4321abcd@localhost:5432/chat_db";
pg.connect(conString,function (err,client,done) {
	if(err){
		return console.error('Could not connect to postgres',err);
	}
	// client.query("insert into sender_details(name) values ('Durga')",function(err,result){
		// if(err)
			// return console.error('error running query',err);
		// client.end();
	// });
	client.query("select * from sender_details",function(err,result){
		if(err)
			return console.error('error running query',err);
		console.log(result.rows);
		client.end();
	});
});