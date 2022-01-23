const btn = document.getElementById('btn');

btn.onclick = () => {
    window.location.href = '../home/home.html';
}

document.addEventListener('DOMContentLoaded', async () => {

    const response1 = await fetch('http://localhost:3000/getallcomands', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        });
    const comandes = await response1.json();

    const response2 = await fetch('http://localhost:3000/getallclients', {
            method: 'get',
            headers: {'Content-Type': 'application/json'}
        });
    const clients = await response2.json();

    console.log(clients);
    //Generar taula
    let table = document.getElementById('table');
    clients.forEach((client) => {
        let nComands = 0;
        let ingresos = 0;
        let beneficis = 0;
        for (let i = 0; i < comandes.length; ++i) {
            if (comandes[i].client === client.client) {
                ++nComands;
                ingresos = ingresos + comandes[i].venda;
                beneficis = beneficis + (comandes[i].venda - (comandes[i].laser + comandes[i].material + comandes[i].mecanitzats + comandes[i].tractament + comandes[i].transport + comandes[i].hores))
            }
        }
        const row = table.insertRow();
        row.classList.add('table-body')
        
        row.innerHTML = `
        <td>${client.client}</td>
        <td>${nComands}</td>
        <td class="beneficis">${beneficis.toFixed(2)} €</td>
        <td class="pe${(beneficis/ingresos*100).toFixed(0)} pe">${(beneficis/ingresos*100).toFixed(2)} %</td>
        `
    })  
})