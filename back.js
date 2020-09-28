const scanf = require("scanf");
const bigInt = require("big-integer")
const process = require('process');

function RSA(p,q,e) {
  this.p = p;
  this.q = q;
  this.e = e;
  temp1 = bigInt(p).minus(1)
  temp2 = bigInt(q).minus(1)
  this.phi = temp1.multiply(temp2);
}

RSA.encrypt = (plaintext, key) => plaintext.modPow(key.e,key.n);
RSA.decrypt = (ciphertext, key) =>  ciphertext.modPow(key.d,key.n);
RSA.generateCandidate = (phi,e) => {
  let d = [];
  for (let k=1; d.length < 1; k++) {
    let temp = phi.multiply(k).plus(1)
    if(temp.isDivisibleBy(e)){
      let temp2 = temp.divide(e);
      d.push(temp2.toString());
    }
  }

  if (d.length > 0) {
    for(let i=1; d.length < 5; i++) {
      let temp = bigInt(d[i-1]).plus(phi);
      d.push(temp.toString());
    }
  }
  return d;
}

RSA.prototype.generateKeys = function() {
  let n = bigInt(this.p).multiply(this.q);
  let e = this.e;

  let d = RSA.generateCandidate(this.phi,e);
  /*
  for (let k=1; d.length < 1; k++) {
    let temp = this.phi.multiply(k).plus(1)
    if(temp.isDivisibleBy(e)){
      let temp2 = temp.divide(e);
      d.push(temp2.toString());
    }
  }

  if (d.length > 0) {
    for(let i=1; d.length < 5; i++) {
      let temp = bigInt(d[i-1]).plus(this.phi);
      d.push(temp.toString());
    }
  }
  */

  let publicKey = {e, n};
  let candidate = d;

  return [publicKey, candidate];
}


process.stdout.write("msg: ");
let msg = scanf("%s");
let p = 0, q = 0, e = 0;
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
let [publicKey, candidate] = myRSA.generateKeys();
let privateKey = {};

/* integer only
let privateKey = {d: bigInt(candidate[0]), n: publicKey.n};

let ciphertext = RSA.encrypt(msg,publicKey);
console.log("p * q:", publicKey.n.toString());
console.log("candidate:", candidate);
console.log("ciphertext:", ciphertext)
console.log("plaintext:", RSA.decrypt(ciphertext,privateKey).toString())
*/

let charCode = [];
let cipherText= [];
let __cipherText = [];

for(let i=0; i < msg.length; i++) {
  charCode.push(msg.charCodeAt(i));
  let temp = RSA.encrypt(bigInt(charCode[i]),publicKey)
  cipherText.push(temp);
  __cipherText.push(temp.toString())
}
console.log("msg in UTF-16: ", charCode);
console.log("cipher text; ", __cipherText);

privateKey.n = publicKey.n;
console.log("Candidate: ", candidate);
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

