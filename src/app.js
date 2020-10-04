import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  Table,
  Button,
  Modal,
  ModalBody,
  Pagination,
  PaginationItem,
  PaginationLink
} from 'reactstrap';
import {generatePrime} from './rsa'
import 'bootstrap/dist/css/bootstrap.min.css';

//This function does not check if the parameter is prime, it is assume its prime
function IsSelectedPrime(prime) {
  let lastDigit = prime.slice(-1);
  if(lastDigit === '1' || lastDigit === '3' || lastDigit === '7' || lastDigit === '9')
    return true;
}

function PrimeTable(props) {
  const [value, setValue] = useState('');
  const [modal, setModal] = useState(false);
  const [tableRows, setTableRows] = useState(null);
  const [max, setMax] = useState(1000);
  const [min, setMin] = useState(0);

  function generateTableRow(value) {
    const primeArray = generatePrime(value);
    console.log("done generating");
    const primeMap = primeArray.filter(prime => IsSelectedPrime(prime));
    console.log("done mapping prime")
    const rowMap = [];

    for(let i = 1; i <= (+value)+10; ++i)
      if(!(i%10)) rowMap.push(i);
    console.log("done mapping rows");

    const tempRowMap = rowMap.slice(min/10, max/10);
    console.log(tempRowMap)
    const _tableRows = tempRowMap.map(row => {
      const primeRows = primeMap.filter(prime => prime < row && prime > row-10);
      const primetd = primeRows.map(prime => (
        <td key={prime}>{prime}</td>
      ));
      return (
        <tr key={row}>
          <th scope="row">{row}</th>
          {primetd}
        </tr>
      )
    })
    return _tableRows;
  }


  const handleChange = event => {
    setValue(event.target.value);
  }

  const handleClick = () => {
    setMin(0);
    setMax(1000);
    setTableRows(generateTableRow(value))
    setModal(true)
  }

  const handleToggle = () => {
    setModal(!modal);
  }

  const paginationNext = event => {
    console.log(min,max)
    setMin(max);
    setMax(max+1000);
    console.log(min,max)
  }
  const paginationPrev = () => {
    console.log(min,max)
    setMin(max-2000);
    setMax(max-1000);
    console.log(min,max)
  }

  useEffect(() =>{
    setTableRows(generateTableRow(value))
  }, [min,max])

  return(
    <div>
      <label>
      generate prime:<br/>
      <input type="text" name="prime_num" value={value} onChange={handleChange}/>
      </label>
      <br/>
      <Button onClick={handleClick}>Generate</Button>
      <Button onClick={handleToggle}>Hide Table</Button>
      <Modal isOpen={modal} toggle={handleToggle}>
        <ModalBody>
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
          <Pagination size="sm">
            <PaginationItem>
              <PaginationLink first/>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink previous onClick={paginationPrev}/>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink next onClick={paginationNext}/>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink last/>
            </PaginationItem>
          </Pagination>
        </ModalBody>
      </Modal>
    </div>
  )
}
ReactDOM.render(
  <div>
    <PrimeTable/>
  </div>, document.getElementById('root')
)
