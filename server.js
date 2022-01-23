import express from 'express';
import path from 'path';
import bodyParser from 'body-parser';
import { getAllComands, getComand, postNewComand, removeComand, getAllClients, getClient, updateCommand} from './dataquerys.js';
const app = express();

const port = 3000;

const __dirname = path.resolve(path.dirname(''));

app.use(bodyParser.json());

// Post

app.post('/post', async (req, res) => {
    console.log(req.body);
    const comand = req.body;
    const missatge = await postNewComand(comand);
    res.json({missatge: missatge});
})
app.post('/updatecomand', async (req, res) => {
    console.log(req.body);
    const comand = req.body;
    const missatge = await updateCommand(comand);
    res.json({missatge: missatge});
})

// getallcomands, getcomand, removecomand, getallclients, getclient

app.get('/getallcomands', async (req, res) => {
    const comandes = await getAllComands();
    console.log(comandes);
    res.json(comandes.recordset);
})

app.get('/getallclients', async (req, res) => {
    const clients = await getAllClients();
    console.log(clients);
    res.json(clients.recordset);
})

app.post('/getcomand', async (req, res) => {
    console.log(req.body);
    const info = req.body;
    const comanda = await getComand(info);
    console.log(comanda);
    if (comanda.rowsAffected[0] === 0) res.json({missatge:'La comanda introduida no existeix'});
    else res.json(comanda.recordset[0]);
})

app.post('/getclient', async (req, res) => {
    console.log(req.body);
    const client = req.body;
    const comandes = await getClient(client);
    console.log(comandes);
    if (comandes.rowsAffected[0] === 0) res.json({missatge:'El client introduit no existeix'});
    else res.json(comandes.recordset);
})

app.post('/removecomand', async (req, res) => {
    console.log(req.body);
    const comandId = req.body;
    const missatge = await removeComand(comandId);
    res.json({missatge: missatge});
})

// Home
app.get('/img/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/img/favicon.ico'));
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/home/home.html'));
})
app.get('/home.css', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/home/home.css'));
})
app.get('/home.js', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/home/home.js'));
})
app.get('/pages/img/5e932788093c610ab5b7aa292bfde1f2.jpg', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/img/5e932788093c610ab5b7aa292bfde1f2.jpg'));
})

//comandCreation

app.get('/comandCreation/comandCreation.html', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/comandCreation/comandCreation.html'));
})
app.get('/comandCreation.css', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/comandCreation/comandCreation.css'));
})
app.get('/pages/comandCreation/comandCreation.js', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/comandCreation/comandCreation.js'));
})
app.get('/home/home.html', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/home/home.html'));
})

//viewComand

app.get('/viewComand/viewComand.html', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/viewComand/viewComand.html'));
})
app.get('/viewComand.css', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/viewComand/viewComand.css'));
})
app.get('/viewComand.js', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/viewComand/viewComand.js'));
})

//modifyComand

app.get('/modifyComand/modifyComand.html', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/modifyComand/modifyComand.html'));
})
app.get('/modifyComand.css', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/modifyComand/modifyComand.css'));
})
app.get('/modifyComand.js', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/modifyComand/modifyComand.js'));
})

//totalClients

app.get('/totalClients/totalClients.html', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/totalClients/totalClients.html'));
})
app.get('/totalClients.css', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/totalClients/totalClients.css'));
})
app.get('/totalClients.js', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/totalClients/totalClients.js'));
})

//viewClient

app.get('/viewClient/viewClient.html', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/viewClient/viewClient.html'));
})
app.get('/viewClient.css', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/viewClient/viewClient.css'));
})
app.get('/viewClient.js', (req, res) => {
    res.sendFile(path.join(__dirname , '/pages/viewClient/viewClient.js'));
})
//Listen

app.listen(port, () => {
    console.log('Server started at port 3000')
})