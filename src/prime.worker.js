importScripts("https://peterolson.github.io/BigInteger.js/BigInteger.min.js");


function IsSelectedPrime(prime) {
  //This function does not check if the parameter is prime, it is assume its prime
  let lastDigit = prime.slice(-1);
  if(lastDigit === '1' || lastDigit === '3' || lastDigit === '7' || lastDigit === '9')
    return true;
}

function genPrime(min,max) {
  let primeArray = [];
  for(let i = bigInt(min); i.lt(max) ; i = i.plus(1)){
    if(IsSelectedPrime(i.toString())) {
      if(bigInt(i).isProbablePrime())
        primeArray.push(i.toString());
    }
  }

  return primeArray
}

onmessage = e => {
  let result = genPrime(e.data[0],e.data[1],e.data[2]);
  postMessage(result);
}
