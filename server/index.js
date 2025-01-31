const express = require('express');
const app = express();
const pg = require ('pg');
const client = new pg.Client(process.env.DATABASE_URL || 'postgres://localhost/acme_musicians_db');

app.get('/api/musicians', async(req, res, next)=> {
    try {
        const SQL = `
        SELECT *
        from musicians
        `;
        const response = await client.query(SQL);
        res.send(response.rows);
    }
    catch(ex){
        next(ex);
    }
 });

const setup = async()=> {
    await client.connect();
    console.log('connected to db');

    let SQL = `
        DROP TABLE IF EXISTS musicians;
        CREATE TABLE musicians(
            id SERIAL PRIMARY KEY,
            name VARCHAR(100),
            genre VARCHAR(100),
            topSong VARCHAR(255),
            imageURL TEXT
        );
      `;
    await client.query(SQL);
    console.log('tables created');

    SQL = `
     INSERT INTO musicians (name, genre, topSong, imageURL) 
        VALUES 
            ('Morgan Wallen', 'country', 'Last Night', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZqITnbJoEQhUZhLqKfhwaxH4evYbHUqRcCg&s'),
            ('Ty Myers', 'country', 'Ends of the Earth', 'https://photos.bandsintown.com/thumb/17738140.jpeg'),
            ('Tate McRae', 'pop', 'Greedy', 'https://www.rollingstone.com/wp-content/uploads/2024/11/tate-mccrae-song.jpg?w=1600&h=900&crop=1')
        ON CONFLICT (id) DO NOTHING;
    `
    await client.query(SQL);
    console.log('data seeded');

    const port = process.env.PORT || 3000;
    app.listen(port, ()=> console.log(`listening on port ${port}`));
}

setup ();