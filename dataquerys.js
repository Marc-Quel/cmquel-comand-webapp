
import sql from 'mssql';

const dbSettings = {
    user: process.env.USER,
    password: process.env.PASSWORD,
    server: process.env.SERVER,
    database: process.env.DATABASE,
    options: {
        encrypt: true,
        trustServerCertificate: true
    }
};

export function getAllComands() {
    return new Promise(async (resolve) => {
        const pool = await sql.connect(dbSettings);
        const comandes = await pool.request().query('select * from COMANDES');
        resolve(comandes);
    });
}
export function getAllClients() {
    return new Promise(async (resolve) => {
        const pool = await sql.connect(dbSettings);
        const clients = await pool.request().query('select distinct client from COMANDES');
        resolve(clients);
    });
}
export function getComand(info) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await sql.connect(dbSettings);
            const comanda = await pool.request().query(`select * from COMANDES where comand = ${info.comandId} and client = '${info.client}'`);
            resolve(comanda);
        }
        catch(error){
            reject(error);
        }
    });
}

export function getClient(client) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await sql.connect(dbSettings);
            const comandes = await pool.request().query(`select * from COMANDES where client = '${client.client}'`);
            resolve(comandes);
        }
        catch(error){
            reject(error);
        }
    });
}

export async function removeComand(info) {
    return new Promise(async (resolve, reject) => {
        try {
            const pool = await sql.connect(dbSettings);
            await pool.request().query(`delete from COMANDES where comand = ${info.comandId} and client = '${info.client}'`);
            resolve("Comanda borrada");
        }
        catch(error){
            reject(error);
        }
    });
}

export function updateCommand(comand) {
    return new Promise(async (resolve, reject) => {
       try {
        const pool = await sql.connect(dbSettings);
        await pool.request().query(`delete from COMANDES where comand = ${comand.ncomanda} and client = '${comand.client}'`);
        await pool.request()
        .input('comand', sql.Real, comand.ncomanda)
        .input('client', sql.VarChar(40), comand.client)
        .input('laser', sql.Real, comand.laser)
        .input('material', sql.Real, comand.material)
        .input('mecanitzats', sql.Real, comand.mecanitzats)
        .input('tractament', sql.Real, comand.tractament)
        .input('transport', sql.Real, comand.transport)
        .input('hores', sql.Real, comand.hores)
        .input('venda', sql.Real, comand.venda)
        .query('insert into COMANDES (comand, client, laser, material, mecanitzats, tractament, transport, hores, venda) values(@comand, @client, @laser, @material, @mecanitzats, @tractament, @transport, @hores, @venda)');
        resolve("Comanda actualitzada");
       }
       catch(error) {
        reject(error);
       }
    });
}

export function postNewComand(comand) {
    return new Promise(async (resolve, reject) => {
       try {
        const pool = await sql.connect(dbSettings);
        await pool.request()
        .input('comand', sql.Real, comand.ncomanda)
        .input('client', sql.VarChar(40), comand.client)
        .input('laser', sql.Real, comand.laser)
        .input('material', sql.Real, comand.material)
        .input('mecanitzats', sql.Real, comand.mecanitzats)
        .input('tractament', sql.Real, comand.tractament)
        .input('transport', sql.Real, comand.transport)
        .input('hores', sql.Real, comand.hores)
        .input('venda', sql.Real, comand.venda)
        .query('insert into COMANDES (comand, client, laser, material, mecanitzats, tractament, transport, hores, venda) values(@comand, @client, @laser, @material, @mecanitzats, @tractament, @transport, @hores, @venda)');
        resolve("Comanda afegida");
       }
       catch(error) {
        reject(error);
       }
    });
}