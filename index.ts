//database connection using ts

//importing dependencies/middleware needed and the types for ts
import express, {Express, Request, Response} from 'express';
import mysql, {Connection, MysqlError} from 'mysql';


const app: Express = express();

app.use(express.json()); //parsing incoming json requests

const port: number = 5000; //calling port 

//creating that connection to the mysql database
const connection: Connection = mysql.createConnection({
    host: '127.0.0.1',
    user: 'devuser',
    password: 'Josefinaflores73',
    database: 'dummydb',
});

//grabbing the query from the database 
//will throw an error if it doesnt 
app.get('/', (req:Request, res:Response) =>{
    connection.query('SELECT * FROM products',
    req.body, (err:MysqlError | null, result:any) =>{
        if (err){
            console.log(err)
            res.status(500).end()
            return
        }
        res.status(200).json(result).end()
    });
});


//listening on the port 5000
app.listen(port, ()=>{
    console.log(`Listening on port ${port}`)
})




//CRUD
//not sure if this was part of the challenge but it was 
//good practice with postman as well

//Create portion of crud
//added dummy data 
app.post('/', (req: Request, res: Response) => {
    connection.query("INSERT INTO products SET ?", req.body, (err: MysqlError | null, result: any) => {
      if (err) {
        console.error(err)
        res.status(500).end()
        return
      }
      req.body.id = result.insertId
      res.status(200).json(req.body).end()
    });
  })

  //Read portion of crud
  //based on the id
  app.get('/:id', (req: Request, res: Response) => {
    connection.query("SELECT * FROM products WHERE id = ?", 
    [req.params.id], (err: MysqlError | null, result: any) => {
      if (err) {
        console.error(err)
        res.status(500).end()
       return
      }
      res.status(200).json(result).end()
    });
  })

//Update portion of crud
app.put('/:id', (req: Request, res: Response) => {
    req.body.id = Number(req.params.id)
    connection.query(
      "UPDATE products SET name = ?, price = ?, genre = ? WHERE id = ?",
      [req.body.name, req.body.price, req.body.genre, req.body.id],
      (err: MysqlError | null) => {
      if (err) {
        console.error(err)
        res.status(500).end()
        return
      }
      res.status(200).json(req.body).end()
    });
  })


//Delete portion of crud
app.delete('/:id', (req:Request, res:Response)=>{
    connection.query('DELETE FROM products WHERE id = ?',
     [req.params.id], (err: MysqlError | null) => {
        if (err){
            console.log(err)
            res.status(500).end()
            return 
        }
        res.status(200).end()
     })
})