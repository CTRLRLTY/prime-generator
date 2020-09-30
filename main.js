const scanf = require("scanf");
const bigInt = require("big-integer")
const process = require('process');

//************************************* Function ************************************* //
//**
//*
//
let loadTime = 0;

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
  loadTime = 0;
  // Check whether the decrypted text match with the plaintext
  for(let i = 0; i < ciphertext.length; i++) {
    loadTime++;
    msg.push(RSA.decrypt(bigInt(ciphertext[i]),key));
    if(msg[i].toString() !== plaintext[i]) return false
  }

  return true
}

RSA.generateCandidate = function (phiArray,{e:e,n:n} = {e: 0, n:0},ciphertext,plaintext) {
  let d = {};
  let test = {};
  let decryptable = {};
  loadTime = 0;
  for(let i = 0; i < phiArray.length; i++){
    let phi = bigInt(phiArray[i]);
    let propertyPhi = phi.toString();
    d[propertyPhi] = []
    test[propertyPhi] = []
    decryptable[propertyPhi] = []

    for (let k=1; d[propertyPhi].length < 1; k++) { //((phi*k)+1)/e
      let temp = phi.multiply(k).plus(1)
      if(temp.isDivisibleBy(e)){
        loadTime++;

        let privateKey = {d:temp.divide(e),n};
        if(RSA.validate(ciphertext,plaintext,privateKey)) d[propertyPhi].push(privateKey.d.toString());
      }
    }

    if (d[propertyPhi].length > 0) {
      if(i > 0){ //only for non true description
        let tempD = bigInt(d[propertyPhi][0]); // Set first d to temp
        if(!bigInt(d[propertyPhi][0]).isPrime()) d[propertyPhi].pop() // if not prime pop the first element
        while(d[propertyPhi].length < 5) {
          tempD = tempD.plus(phi); // d+phi*n
          if(RSA.validate(ciphertext,plaintext,{d:tempD,n}) && tempD.isOdd()) {
            loadTime++;
            d[propertyPhi].push(tempD.toString()) //is it odd and can decrypt
          }
        }
      } else {
        for(let ii=0; d[propertyPhi].length < 5; ii++) { //d+r*n
          let tempD = bigInt(d[propertyPhi][ii]).plus(phi); //d+phi*n
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
  for(
    let y = 0,temp = bigInt(2).pow(y); 
    phiArray.length < 5 && r.isEven();
    y++,temp = bigInt(2).pow(y),r = phi.divide(temp)
  ) {
    if(phi.isDivisibleBy(temp))
      phiArray.push(r.toString());
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

//************************************* Start Here ************************************* //
//**
//*
//
async function main() {
  process.stdout.write("msg: ");
  let msg = scanf("%s");
  let p = 0, q = 0, e = 0;

  // Filter for all input to only be prime
  while(1) {
    if(!bigInt(p).isPrime()) {
      process.stdout.write("input p [must be prime]: ");
      p = scanf("%s");
    } else if(!bigInt(q).isPrime()) {
      process.stdout.write("input q [must be prime]: ");
      q = scanf("%s");
    }
    else if(!bigInt(e).isPrime()) {
      process.stdout.write("input e [must be prime]: ");
      e = scanf("%s");
    } else break
  }

  let myRSA = new RSA(p,q,e);
  console.log("Generating Phi")
  let phiArray = myRSA.getAllPhi();
  console.log("Generating Public key")
  let publicKey = myRSA.generatePublicKey();
  let privateKey = {}; 

  let charCode = []; //The uncode version of each char from msg
  let cipherText= []; //used to store calculation
  let __cipherText = []; //used for output 

  for(let i=0; i < msg.length; i++) {
    charCode.push(msg.charCodeAt(i).toString());
    let temp = RSA.encrypt(bigInt(charCode[i]),publicKey)
    cipherText.push(temp);
    __cipherText.push(temp.toString())
  }
  console.log("Generating Candidate for private key")
  await let [candidate, isPrime,decryptable] = RSA.generateCandidate(phiArray,publicKey,cipherText,charCode);

  console.log("msg in UTF-16: ", charCode);
  console.log("cipher text; ", __cipherText);

  privateKey.n = publicKey.n;
  console.log("R original: ", [phiArray[0]]);
  console.log("R simplified: ", phiArray.slice(1))
  phiArray.pop(0);
  console.log("Candidate: ", candidate);
  console.log("Is prime: ", isPrime)
  console.log("Can decrypt: ", decryptable)
  if(candidate.length < 1) 
    console.log("No candidate");
  else {
    process.stdout.write("Select Candidate for d: ");
    let d = scanf("%s");
    privateKey.d = bigInt(d);

    let plainText = [];
    for(let i=0; i < cipherText.length; i++) 
      plainText.push(String.fromCharCode(RSA.decrypt(cipherText[i],privateKey) + ""));
    console.log("Decryption: ",plainText.toString().replace(/,/g,""));
  }
}

main();




