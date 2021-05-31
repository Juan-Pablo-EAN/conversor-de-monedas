//29fdaa15910d24eb6dd422b5b5635ad2
//https://api.aviationstack.com/v1/

const valorUno = document.querySelector(".valorUno");
const valorDos = document.querySelector(".valorDos");
const resultado = document.querySelector(".resultado");
const monedasUno = document.getElementById("monedasUno");
const monedasDos = document.getElementById("monedasDos");

var monedaA;
var monedaB;
var monto;
var unDolar1;
var unDolar2;

valorUno.addEventListener("keyup", () => {
    if (valorUno.value != "") {
        monedaA = monedasUno.className;
        monedaB = monedasDos.className;

        let coin1 = "USD" + monedaA;
        let coin2 = "USD" + monedaB;

        monto = parseInt(valorUno.value);

        valores(coin1, coin2, monto);

    } else {
        valorDos.value = "";
    }
});

const valores = async (moin1, moin2, amount) => {
    var dolar1;
    var dolar2;
    unDolar1 = await consultarConversion();
    unDolar2 = await consultarConversion();
    dolar1 = buscarValorUSD(unDolar1, moin1);
    dolar2 = buscarValorUSD(unDolar2, moin2);

    var funcion = (amount / dolar1) * dolar2;
    valorDos.value = funcion;
    return funcion;
}

const buscarValorUSD = (promesa, divisa) => {
    for (let coin in promesa.quotes) {
        if (divisa == coin) {
            return unDolar1.quotes[coin];
        }
    }
}

async function consultarConversion() {
    return fetch(`http://apilayer.net/api/live?access_key=fe43f9d57262609bfabf183f9664825a`)
        .then(res => res.json())
        .then(data => data);
};

const asignarClases = (lista) => {
    lista.addEventListener("change", () => {
        fetch("http://api.currencylayer.com/list?access_key=fe43f9d57262609bfabf183f9664825a")
            .then(res => res.json())
            .then(datos => {
                for (let key in datos.currencies) {
                    if (lista.value == datos.currencies[key]) {
                        lista.className = `${key}`;
                    }
                }
            });
            valorUno.value = "";
            valorDos.value = "";
    });
}

const opcionesMonedas = () => {
    fetch("http://api.currencylayer.com/list?access_key=fe43f9d57262609bfabf183f9664825a")
        .then(res => res.json())
        .then(datos => {
            for (let key in datos.currencies) {
                monedasUno.innerHTML += `<option class="${key}">${datos.currencies[key]}</option>`;
                monedasDos.innerHTML += `<option class="${key}">${datos.currencies[key]}</option>`;
            }
        });
    monedasUno.className = "AED";
    monedasDos.className = "AED";
}

asignarClases(monedasUno);
asignarClases(monedasDos);
opcionesMonedas();