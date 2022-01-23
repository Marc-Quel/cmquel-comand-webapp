const btn = document.getElementById('btn');
const addBtn = document.getElementById('add');
const cleanBtn = document.getElementById('clean');
let ncomanda = document.getElementById('ncomanda').value;
let client = document.getElementById('client').value;
let laser = document.getElementById('laser').value;
let material = document.getElementById('mat').value;
let mecanitzats = document.getElementById('mec').value;
let tractament = document.getElementById('tract').value;
let transport = document.getElementById('trans').value;
let hores = document.getElementById('hores').value;
let venda = document.getElementById('venda').value;

btn.onclick = () => {
    window.location.href = '../home/home.html';
}
cleanBtn.onclick = () => {
    window.location.href = 'comandCreation/comandCreation.html';
}
addBtn.addEventListener('click', async () => {
    ncomanda = document.getElementById('ncomanda').value;
    client = document.getElementById('client').value;
    laser = document.getElementById('laser').value;
    material = document.getElementById('mat').value;
    mecanitzats = document.getElementById('mec').value;
    tractament = document.getElementById('tract').value;
    transport = document.getElementById('trans').value;
    hores = document.getElementById('hores').value;
    venda = document.getElementById('venda').value;
    if ((ncomanda === "") || (client === "") || (laser === "") || (material === "")
    || (mecanitzats === "") || (tractament === "") || (transport === "")
    || (hores === "") || (venda === "")) window.alert("Algun dels parametres esta buit");
    else {
        const comanda = {
            ncomanda,
            client,
            laser,
            material,
            mecanitzats,
            tractament,
            transport,
            hores,
            venda
        }
        console.log(comanda);
        const response = await fetch('http://localhost:3000/post', {
            method: 'post',
            body: JSON.stringify(comanda),
            headers: {'Content-Type': 'application/json'}
        });
        const missatge = await response.json();
        window.alert(missatge.missatge);
        window.location.href = 'comandCreation/comandCreation.html';
    }
});