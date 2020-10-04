import {genRowMap} from './rsa';
import bigInt from 'big-integer';

onmessage = msg => {
  let rows = genRowMap(bigInt(msg.data.min), msg.data.max);
  postMessage(rows);
}
