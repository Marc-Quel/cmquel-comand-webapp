const btn = document.getElementById('btn');
const searchBtn = document.getElementById('search');
const cleanBtn = document.getElementById('clean');
let comandId = document.getElementById('comandId').value;
let client = document.getElementById('client').value;

btn.onclick = () => {
    window.location.href = '../home/home.html';
}

document.addEventListener('DOMContentLoaded', async () => {
    const response = await fetch('http://localhost:3000/getallcomands', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        });
    const comandes = await response.json();
    console.log(comandes);
    //Generar taula
    let table = document.getElementById('table');
    comandes.forEach((comanda) => {
        const row = table.insertRow();
        row.classList.add('table-body')
        const beneficiEuro = comanda.venda - (comanda.laser + comanda.material + comanda.mecanitzats + comanda.tractament + comanda.transport + comanda.hores);
        const beneficiPercentatge = (beneficiEuro/comanda.venda)*100;
        row.innerHTML = `
        <td>${comanda.comand}</td>
        <td>${comanda.client}</td>
        <td>${comanda.laser.toFixed(2)} €</td>
        <td>${comanda.material.toFixed(2)} €</td>
        <td>${comanda.mecanitzats.toFixed(2)} €</td>
        <td>${comanda.tractament.toFixed(2)} €</td>
        <td>${comanda.transport.toFixed(2)} €</td>
        <td>${comanda.hores.toFixed(2)} €</td>
        <td>${comanda.venda.toFixed(2)} €</td>
        <td class="beneficis">${beneficiEuro.toFixed(2)} €</td>
        <td class="pe${beneficiPercentatge.toFixed(0)} pe">${beneficiPercentatge.toFixed(2)} %</td>
        `
    })  
})
searchBtn.addEventListener('click', async () => {
    comandId = document.getElementById('comandId').value;
    client = document.getElementById('client').value;
    if ((comandId === "")|| (client === "")) window.alert("Has d'introduir totes les dades");
    else {
        const response = await fetch('http://localhost:3000/getcomand', {
            method: 'post',
            body: JSON.stringify({comandId:comandId, client:client}),
            headers: {'Content-Type': 'application/json'}
        });
        const missatge = await response.json();
        if (missatge.missatge) window.alert(missatge.missatge);
        else {
            let table = document.getElementById('table');
            table.innerHTML = `
            <thead class="aux" id="generar">
            <th scope="col">Num Comanda</th>
            <th scope="col">Client</th>
            <th scope="col">Laser</th>
            <th scope="col">Material</th>
            <th scope="col">Mecanitzats</th>
            <th scope="col">Tractament</th>
            <th scope="col">Transport</th>
            <th scope="col">Hores</th>                  
            <th scope="col">Import de venda</th>
            <th scope="col">Benefici(€)</th>
            <th scope="col">Benefici(%)</th>
          </thead>
          <tbody>
          <tr id="first-row">
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          </tbody>`
          const row = table.insertRow();
        row.classList.add('table-body')
        const beneficiEuro = missatge.venda - (missatge.laser + missatge.material + missatge.mecanitzats + missatge.tractament + missatge.transport + missatge.hores);
        const beneficiPercentatge = (beneficiEuro/missatge.venda)*100;
        row.innerHTML = `
        <td>${missatge.comand}</td>
        <td>${missatge.client}</td>
        <td>${missatge.laser.toFixed(2)} €</td>
        <td>${missatge.material.toFixed(2)} €</td>
        <td>${missatge.mecanitzats.toFixed(2)} €</td>
        <td>${missatge.tractament.toFixed(2)} €</td>
        <td>${missatge.transport.toFixed(2)} €</td>
        <td>${missatge.hores.toFixed(2)} €</td>
        <td>${missatge.venda.toFixed(2)} €</td>
        <td class="beneficis">${beneficiEuro.toFixed(2)} €</td>
        <td class="pe${beneficiPercentatge.toFixed(0)} pe">${beneficiPercentatge.toFixed(2)} %</td>
        `
        document.getElementById('div-clean').style.display = "flex";
        document.getElementById('search').disabled = true;
        }
    }
})
cleanBtn.onclick = () => {
    window.location.href = 'viewComand/viewComand.html';
}