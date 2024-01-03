import { useCallback, useEffect, useState } from "react";

function App() {
  const [range, setRange] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState('')
  // console.log(isNumberAllowed);

const myPassword = useCallback(()=>{
  const letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const num = '0123456789';
  const specialChar = '@#$%^&*¢£¥';

  let pass = '';

  let str = letter.slice();
  if(isNumberAllowed) {
    str += num;
  }
  if(isSpecialCharAllowed) {
    str += specialChar;
  } 
  if(isNumberAllowed && isSpecialCharAllowed) {
    let strWithNum = str + num;
    let strWithBoth = strWithNum+ specialChar;
    str = strWithBoth;
  }

  for(let i=0; i<range; i++){
    const randomNum = Math.floor( Math.random()* str.length);
    pass += str.charAt(randomNum)

  }

  setPassword(pass);

}, [isNumberAllowed, isSpecialCharAllowed, range])

useEffect(()=>{
  myPassword()
},[isNumberAllowed, isSpecialCharAllowed, range, setPassword, myPassword])
 

return (
    <>
      <div>Your Random Password: {password}</div>
      <div>
        {/* <h3>Trying to read input-range value</h3> */}
        <p>Drag to change the number of characters of your password.</p>
        <input
          type="range"
          id="range"
          min={6}
          max={100}
          value={range}
          onChange={(e) => setRange(e.target.value)}
        />
        <label htmlFor="range">Password: {range} characters</label>
      </div>
      <div>
        {/* <h3>Trying to read if a checkbox is clicked</h3> */}
        <input
          type="checkbox"
          onClick={() => {
            setIsNumberAllowed((prev) => !prev);
            // console.log("Number:" +isNumberAllowed);
          }}
          name=""
          id="check"
        />
        <label htmlFor="check">Numbers</label>
      </div>
      <div>
        <input
          type="checkbox"
          name=""
          id=""
          onClick={() => {
            setIsSpecialCharAllowed((prev) => !prev);
            // console.log("Spec:" + isSpecialCharAllowed);
          }}
        />
        <label htmlFor="special-char">Special Characters</label>
      </div>
    </>
  );
}

export default App;
