const bigInt = require("big-integer")


//************************************* Function ************************************* //
//**
//*
//
function RSA(p,q,e) {
  this.p = p;
  this.q = q;
  this.e = e;
  this.n = bigInt(p).multiply(q);
  let temp1 = bigInt(p).minus(1)
  let temp2 = bigInt(q).minus(1)
  this.phi = temp1.multiply(temp2);
}

RSA.encrypt = (plaintext, key) => plaintext.modPow(key.e,key.n);
RSA.decrypt = (ciphertext, key) =>  ciphertext.modPow(key.d,key.n);
RSA.validate = (ciphertext,plaintext,key) => {
  let msg = [];
  // Check whether the decrypted text match with the plaintext
  for(let i = 0; i < ciphertext.length; i++) {
    msg.push(RSA.decrypt(bigInt(ciphertext[i]),key));
    if(msg[i].toString() !== plaintext[i]) return false
  }

  return true
}
RSA.generateCandidate = function (phiArray,{e:e,n:n} = {e: 0, n:0},ciphertext,plaintext) {
  let d = {};
  let test = {};
  let decryptable = {};
  for(let i = 0; i < phiArray.length; i++){
    let phi = bigInt(phiArray[i]);
    let propertyPhi = phi.toString();
    d[propertyPhi] = []
    test[propertyPhi] = []
    decryptable[propertyPhi] = []

    for (let k=1; d[propertyPhi].length < 1; k++) { //((phi*k)+1)/e
      let temp = phi.multiply(k).plus(1)
      if(temp.isDivisibleBy(e)){
        let privateKey = {d:temp.divide(e),n};
        if(RSA.validate(ciphertext,plaintext,privateKey)) {
          candidateBar.increment();
          d[propertyPhi].push(privateKey.d.toString());
        }
      }
    }

    if (d[propertyPhi].length > 0) {
      if(i > 0){ //only for non true description
        let tempD = bigInt(d[propertyPhi][0]); // Set first d to temp
        if(!bigInt(d[propertyPhi][0]).isPrime()) d[propertyPhi].pop() // if not prime pop the first element
        while(d[propertyPhi].length < 5) {
          tempD = tempD.plus(phi); // d+phi*n
          if(RSA.validate(ciphertext,plaintext,{d:tempD,n}) && tempD.isOdd()) {
            candidateBar.increment();
            d[propertyPhi].push(tempD.toString()) //is it odd and can decrypt
          }
        }
      } else {
        for(let ii=0; d[propertyPhi].length < 5; ii++) { //d+r*n
          let tempD = bigInt(d[propertyPhi][ii]).plus(phi); //d+phi*n
          candidateBar.increment();
          d[propertyPhi].push(tempD.toString());
        }
      }

    }

    //condition check
    for(let ii=0; ii < d[propertyPhi].length; ii++) { //d+r*n
      test[propertyPhi].push(bigInt(d[propertyPhi][ii]).isPrime())
      decryptable[propertyPhi].push(RSA.validate(ciphertext,plaintext,{d:d[propertyPhi][ii],n}))
    }
  }

  return [d,test,decryptable];
}
RSA.prototype.getAllPhi = function() {
  let phi = this.phi;
  let n = this.n;
  let phiArray = [];
  let r = phi;
  let y;
  for(
    y = 0,temp = bigInt(2).pow(y);
    phiArray.length < 5 && r.isEven();
    y++,temp = bigInt(2).pow(y),r = phi.divide(temp)
  ) {
    if(phi.isDivisibleBy(temp)) {
      phiArray.push(r.toString());
    }
  }
  phiArray.push(r.toString()); //last push since its not divisible anymore

  return phiArray;
}
RSA.prototype.generatePublicKey = function() {
  let n = this.n;
  let e = this.e;
  let publicKey = {e, n};
  return publicKey;
}
export default RSA;

export function generatePrime(min,max) {
  let primeArray = [];
  for(let i = bigInt(min); i.lt(max); i = i.plus(1))
    if(i.isPrime()) primeArray.push(i);
  return primeArray
}
export function genRowMap(min,max) {
    const rowMap = [];
    for(let i = bigInt(min); i.leq(max); i = i.plus(1))
        if(i.isDivisibleBy(10) || i.isZero()) rowMap.push(i.toString());
    return rowMap;
  }
