const createcomand = document.getElementById('createcomand');
const allcomands = document.getElementById('allcomands');
const allclients = document.getElementById('allclients')
const viewclient = document.getElementById('viewclient');
const modifycomand = document.getElementById('modifycomand');

modifycomand.onclick = () => {
    window.location.href = '../modifyComand/modifyComand.html'
}

createcomand.onclick = () => {
    window.location.href = '../comandCreation/comandCreation.html';
}
allcomands.onclick = () => {
    window.location.href = '../viewComand/viewComand.html';
}
allclients.onclick = () => {
    window.location.href = '../totalClients/totalClients.html';
}
viewclient.onclick = () => {
    window.location.href = '../viewClient/viewClient.html';
}