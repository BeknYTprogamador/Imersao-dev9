const envio = document.getElementById("button");


//Evento calculo
function calc() {
   envio.addEventListener("click", (evento) => {
       evento.preventDefault(); 
    let inputnumber = document.querySelector("#inputnumber").value;
    let reais = parseFloat (inputnumber);
    let bitcoin = parseFloat ("502.512.56");
    let conversao = reais / bitcoin;

    alert( "Bitcoins são ")
    alert(conversao)
    
   
       
   });
}

calc();
