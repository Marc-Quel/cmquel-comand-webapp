const btn = document.getElementById('btn');
const searchBtn = document.getElementById('search');
const cleanBtn = document.getElementById('clean');
let client = document.getElementById('client').value;

btn.onclick = () => {
    window.location.href = '../home/home.html';
}

searchBtn.addEventListener('click', async () => {
    client = document.getElementById('client').value;
    if (client === "") window.alert("Has d'introduir un client");
    else {
        console.log(typeof client);
        const response = await fetch('http://localhost:3000/getclient', {
            method: 'post',
            body: JSON.stringify({client:client}),
            headers: {'Content-Type': 'application/json'}
        });
        const missatge = await response.json();
        if (missatge.missatge) window.alert(missatge.missatge);
        else {
            document.getElementById('client').disabled = true;
            document.getElementById("search").disabled = true;
            console.log(missatge);
            //Generar taula
            let table = document.getElementById('table');
            let nComands = 0;
            let ingresos = 0;
            let beneficis = 0;
            missatge.forEach((comanda) => {
                ++nComands;
                const row = table.insertRow();
                row.classList.add('table-body')
                const beneficiEuro = comanda.venda - (comanda.laser + comanda.material + comanda.mecanitzats + comanda.tractament + comanda.transport + comanda.hores);
                const beneficiPercentatge = (beneficiEuro/comanda.venda)*100;
                beneficis = beneficis + beneficiEuro;
                ingresos = ingresos + comanda.venda;
                row.innerHTML = `
                <td>${comanda.comand}</td>
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
            let tabletotal = document.getElementById('tabletotal');
            const rowtotal = tabletotal.insertRow();
            rowtotal.classList.add('table-body');
            rowtotal.innerHTML = `
                <td>${nComands}</td>
                <td class="beneficis">${beneficis.toFixed(2)} €</td>
                <td class="pe${(beneficis/ingresos*100).toFixed(0)} pe">${(beneficis/ingresos*100).toFixed(2)} %</td>
            `
        }
    }
})

cleanBtn.onclick = () => {
    window.location.href = 'viewClient/viewClient.html';
}