importScripts("https://peterolson.github.io/BigInteger.js/BigInteger.min.js");

function genPrime(min,max) {
  let primeArray = [];
  for(let i = bigInt(min); i.lt(max) ; i = i.plus(1)){
    if(bigInt(i).isPrime())
      primeArray.push(i.toString());
  }

  return primeArray
}

onmessage = e => {
  let result = genPrime(e.data[0],e.data[1],e.data[2]);
  postMessage(result);
}
