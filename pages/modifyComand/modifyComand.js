const btn = document.getElementById('btn');
const searchBtn = document.getElementById('search');
const cleanBtn = document.getElementById('clean');
const removeBtn = document.getElementById('remove');
const modifyBtn = document.getElementById('modify');
let comandId = document.getElementById('comandId').value;
let client = document.getElementById('client').value;


btn.onclick = () => {
    window.location.href = '../home/home.html';
}

searchBtn.addEventListener('click', async () => {
    comandId = document.getElementById('comandId').value;
    client = document.getElementById('client').value;
    if ((comandId === "")|| (client === "")) window.alert("Has d'introduir totes les dades");
    else {
        console.log(comandId + " " + client);
        const response = await fetch('http://localhost:3000/getcomand', {
            method: 'post',
            body: JSON.stringify({comandId:comandId, client:client}),
            headers: {'Content-Type': 'application/json'}
        });
        const missatge = await response.json();
        if (missatge.missatge) window.alert(missatge.missatge);
        else {
            document.getElementById('comandId').disabled = true;
            document.getElementById('client').disabled = true;
            document.getElementById("search").disabled = true;
            document.getElementById('inputs2').style.display = "flex";
            document.getElementById('inputs3').style.display = "flex";
            document.getElementById('butons').style.display = "flex";
            console.log(missatge);
            //Generar inputs
            document.getElementById('laser').value = missatge.laser.toFixed(2);
            document.getElementById('mat').value = missatge.material.toFixed(2);
            document.getElementById('mec').value = missatge.mecanitzats.toFixed(2);
            document.getElementById('tract').value = missatge.tractament.toFixed(2);
            document.getElementById('trans').value = missatge.transport.toFixed(2);
            document.getElementById('hores').value = missatge.hores.toFixed(2);
            document.getElementById('venda').value = missatge.venda.toFixed(2);
        }
    }
})

cleanBtn.onclick = () => {
    window.location.href = 'modifyComand/modifyComand.html';
}
modifyBtn.addEventListener('click', async () => {
    if (document.getElementById('comandId').disabled === true && document.getElementById('client').disabled === true && document.getElementById("search").disabled === true) {
        console.log(comandId);
        const laser = document.getElementById('laser').value;
        const material = document.getElementById('mat').value;
        const mecanitzats = document.getElementById('mec').value;
        const tractament = document.getElementById('tract').value;
        const transport = document.getElementById('trans').value;
        const hores = document.getElementById('hores').value;
        const venda = document.getElementById('venda').value;
        const comanda = {
            ncomanda: comandId,
            client,
            laser,
            material,
            mecanitzats,
            tractament,
            transport,
            hores,
            venda
        }
        const response = await fetch('http://localhost:3000/updatecomand', {
            method: 'post',
            body: JSON.stringify(comanda),
            headers: {'Content-Type': 'application/json'}
        });
        const missatge = await response.json();
        window.alert(missatge.missatge);
        window.location.href = 'modifyComand/modifyComand.html';
    }
})
removeBtn.addEventListener('click', async () => {
    if (document.getElementById('comandId').disabled === true && document.getElementById('client').disabled === true && document.getElementById("search").disabled === true) {
        console.log(comandId);
        const response = await fetch('http://localhost:3000/removecomand', {
            method: 'post',
            body: JSON.stringify({comandId:comandId, client:client}),
            headers: {'Content-Type': 'application/json'}
        });
        const missatge = await response.json();
        window.alert(missatge.missatge);
        window.location.href = 'modifyComand/modifyComand.html';
    }
})