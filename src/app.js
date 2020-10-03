import React, {useState, useEffect} from 'react';
import ReactDOM from 'react-dom';
import {
  Table,
  Button
} from 'reactstrap';
import {generatePrime} from './rsa'

//This function does not check if the parameter is prime, it is assume its prime
function IsSelectedPrime(prime) {
  let lastDigit = prime.slice(-1);
  if(lastDigit === '1' || lastDigit === '3' || lastDigit === '7' || lastDigit === '9')
    return true;
}

function PrimeTable(props) {
  const [value, setValue] = useState('');
  const [tableRows, setTableRows] = useState(null);

  function generateTableRow(value) {
    const primeArray = generatePrime(value);
    console.log("done generating");
    const primeMap = primeArray.filter(prime => IsSelectedPrime(prime));
    console.log("done mapping prime")
    const rowMap = [];

    for(let i = 1; i <= (+value)+10; ++i)
      if(!(i%10)) rowMap.push(i);
    console.log("done mapping rows");

    const _tableRows = rowMap.map(row => {
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
    if(value > 100000)
      alert("You can't generate that high: (only < 100000)");
    else
      setTableRows(generateTableRow(value))
  }
  let _Table;
  if(tableRows)
    _Table = '';
  else
    _Table = (
      <Table striped>
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
    )

  return(
    <div>
      <label>
      generate prime:<br/>
      <input type="text" name="prime_num" value={value} onChange={handleChange}/><br/>
      </label>

      <Button onClick={handleClick}>Generate</Button>
      {_Table}
    </div>
  )
}
ReactDOM.render(
  <div>
    <PrimeTable/>
  </div>, document.getElementById('root')
)
