var mysql = require('mysql');

var con = mysql.createConnection({
  host: process.env.WORDPRESS_DB_HOST,
  user: process.env.WORDPRESS_DB_USER,
  password: process.env.WORDPRESS_DB_PASSWORD,
  database: process.env.WORDPRESS_DB_NAME
});

con.connect(function(err) {
  if (err) throw err;

  // Updates the environment to make it available locally

  var sql = `UPDATE wp_options SET option_value='http://${process.env.WORDPRESS_REAL_HOST}' WHERE option_name='siteurl' OR option_name='home'`;
  con.query(sql, function (err, result) {
    if (err) throw err;
    console.log(result.affectedRows + " record(s) updated");
  });
});