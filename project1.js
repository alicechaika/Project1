//получая криптосимволы вывести 10 случайных символов из первого ендпоинта в консоль(делать это через браузере через prompt()
//у пользователя должна быть возможность одну из пар криптосимволов, после чего запрос посылается во второй ендпоинт.
//во втором ендпоинте будет браться цена криптосимвола из первого ендпоинта и выводится в консоль.
//async, await, fetch, prompt
async function FetchCryptoSymbols(){
    try{
        let firstResponse =await fetch ('https://api.api-ninjas.com/v1/cryptosymbols?', {
            headers: {
                'X-Api-Key' :  '9gPhQARMpxVPgYxRTbZBwg==RTcQ1cw7trdlrYlK'
            }
        });
        console.log(firstResponse);
        let data = await firstResponse.json();
        console.log(data);
        let symbols = data.symbols;
        let randomSymbols = GetRandomSymbol(symbols);
        let chosenSymbol = prompt('Choose the CryptoSymbol:', '');
        await FetchPriceOfCryptoSymbol(chosenSymbol, randomSymbols);//строка для вылавливания цены криптосимвола
    }
    catch(e){
       console.error("Something is wrong with getting CryptoSymbol", e);
    }
}
function GetRandomSymbol(symbols){
    let randomSymbols = [];
    for(let i = 0; i < 10; i++){
        let indexOfRandomizer = Math.floor(Math.random() * symbols.length);
        randomSymbols.push(symbols[indexOfRandomizer]);
    }
    console.log("Random Symbols you get:", randomSymbols);
    return randomSymbols;
}

async function FetchPriceOfCryptoSymbol(chosenSymbol, randomSymbols){
    if(randomSymbols.includes(chosenSymbol)){
        let secondResponse = await fetch('https://api.api-ninjas.com/v1/cryptoprice?symbol= + chosenSymbol', {
            headers: {
                'X-Api-Key' :  '9gPhQARMpxVPgYxRTbZBwg==RTcQ1cw7trdlrYlK'
            }
        });
        let priceData = await secondResponse.json();
        console.log("Chosen Symbol of user:", chosenSymbol, "Price for chosen symbol:", priceData);
    }
    else{
        console.log("HTTP-request error.")
    }
}
FetchCryptoSymbols();
