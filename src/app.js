import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import bigInt from 'big-integer';
import {
  Table,
  Button,
  Modal,
  ModalBody,
  Pagination,
  PaginationItem,
  PaginationLink,
} from 'reactstrap';
import {CSVLink} from 'react-csv';
import {generatePrime, genRowMap} from './rsa'
import P_Worker from './prime.worker.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

function createWork(worker, data) {
  return new Promise((resolve,reject) => {
    let thread = new worker();
    thread.postMessage(data);
    thread.onmessage = e => {
      thread.terminate();
      resolve(e.data);
    }
  })
}


function getLastDigit(str) {
  return str.slice(-1);
}

let rowMap = [];
let finishWork = 0;
const totalWorker = 1;
function PrimeTable(props) {
  const [tableRows, setTableRows] = useState(null);
  const [_rowMap, _setRowMap] = useState(1);
  const [max, setMax] = useState(bigInt(1000));
  const [min, setMin] = useState(bigInt(0));
  const [temporaryBuffer, setBuffer] = useState("");

  function generateTableRow(primeArray) {

    const primeMap = primeArray
    const rowMap = genRowMap(min,max);

    const tableData = rowMap.map(row => {
      const primeRows = primeMap.filter(prime => bigInt(prime).gt(row) && bigInt(prime).lt(bigInt(row).plus(10)));
      const _primeRows = [" ","  ","   ","    "];
      for (let i=0; i < 4; i++) {
        if(primeRows[i] !== undefined) {
          //All of the primeRows are of BigInt, it needs to be stored as string or error will occured
          let lastDigit = getLastDigit(primeRows[i].toString());
          if(lastDigit === '1') _primeRows[0] = primeRows[i].toString();
          else if (lastDigit === '3') _primeRows[1] = primeRows[i].toString();
          else if (lastDigit === '7') _primeRows[2] = primeRows[i].toString();
          else if (lastDigit === '9') _primeRows[3] = primeRows[i].toString();
        }
      }
      return ([
        row, ..._primeRows
      ])
    })

    const _tableRows = tableData.map(col => (
      <tr key={col[0]}>
        <th scope="row">{col[0]}</th>
        <td>{col[1]}</td>
        <td>{col[2]}</td>
        <td>{col[3]}</td>
        <td>{col[4]}</td>
      </tr>
    ))

    return [_tableRows, tableData];
  }

  const handleKeyDown = e => {
    let searchval = bigInt(e.target.value);
    if(e.keyCode === 13) {
    console.log(new Date());
      if(searchval.lt(1000))
        setMax(bigInt(1000));
      else
        setMax(searchval);
      setMin(searchval.minus(1000));
    }

  }

  const paginationNext = () => {
    setMin(max);
    setMax(max.plus(1000));
  }
  const paginationPrev = () => {
    if(min.gt(0)){
      setMin(max.minus(2000));
      setMax(max.minus(1000));
    }
  }

  useEffect(() => {
    if(finishWork === totalWorker) {
      let sortedData = rowMap.flat().sort((a,b) => bigInt(a).minus(b));
      console.log(new Date());
      let [tableRow,tableData] = generateTableRow(sortedData)
      setTableRows(tableRow);
      console.log(tableData)
      setBuffer(
        <Pagination size="sm">
          <PaginationItem>
            <PaginationLink previous onClick={paginationPrev}/>
          </PaginationItem>
          <PaginationItem>
            <input type="text" onKeyDown={handleKeyDown}/>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink next onClick={paginationNext}/>
          </PaginationItem>
          <PaginationItem>
            <CSVLink data={tableData} headers={["row","1","3","7","9"]}><Button>Export to CSV</Button></CSVLink>
          </PaginationItem>
        </Pagination>
      )

    } else setBuffer(finishWork/totalWorker)
  },[rowMap]);

  useEffect(() =>{
    _setRowMap([]);
    finishWork=0;
    let workers = createWork(P_Worker, [min.toString(),max.toString()])
    workers.then(data => {
        rowMap = rowMap.concat(data);
        finishWork++;
        _setRowMap(rowMap);
      })
  }, [min,max])

  return(
    <div>
        <Table bordered>
          <thead>
            <tr>
              <th>#</th>
              <th>1</th>
              <th>3</th>
              <th>7</th>
              <th>9</th>
            </tr>
          </thead>
          <tbody>
            {tableRows}
          </tbody>
        </Table>
        {temporaryBuffer}
    </div>
  )
}
ReactDOM.render(
  <div>
    <PrimeTable/>
  </div>, document.getElementById('root')
)
