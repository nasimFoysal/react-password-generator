import { useCallback, useEffect, useRef, useState } from "react";

function App() {
  const [range, setRange] = useState(8);
  const [isNumberAllowed, setIsNumberAllowed] = useState(false);
  const [isSpecialCharAllowed, setIsSpecialCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  // console.log(isNumberAllowed);

  const myPassword = useCallback(() => {
    const letter = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    const num = "0123456789";
    const specialChar = "@#$%^&*¢£¥";

    let pass = "";

    let str = letter.slice();
    if (isNumberAllowed) {
      str += num;
    }
    if (isSpecialCharAllowed) {
      str += specialChar;
    }
    if (isNumberAllowed && isSpecialCharAllowed) {
      let strWithNum = str + num;
      let strWithBoth = strWithNum + specialChar;
      str = strWithBoth;
    }

    for (let i = 0; i < range; i++) {
      const randomNum = Math.floor(Math.random() * str.length);
      pass += str.charAt(randomNum);
    }

    setPassword(pass);
  }, [isNumberAllowed, isSpecialCharAllowed, range]);

  useEffect(() => {
    myPassword();
  }, [isNumberAllowed, isSpecialCharAllowed, range, setPassword, myPassword]);

  const copyPassToClipboard = useCallback(() => {
    window.navigator.clipboard.writeText(password);
  }, [password]);

  return (
    <>
      <div>Your Random Password: {password}</div>
      <div>
        <button onClick={copyPassToClipboard}>Copy</button>
      </div>
      <div>
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
        <input
          type="checkbox"
          onClick={() => {
            setIsNumberAllowed((prev) => !prev);
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
          }}
        />
        <label htmlFor="special-char">Special Characters</label>
      </div>
    </>
  );
}

export default App;
