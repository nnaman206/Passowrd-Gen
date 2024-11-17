import { useState, useCallback, useEffect, useRef } from 'react';

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [uppercase, setUppercase] = useState(false);
  const [password, setPassword] = useState('');
  
  // Ref for the password input
  const passwordRef = useRef(null);

  // Password Generation Logic
  const PasswordGen = useCallback(() => {
    let pass = '';
    let str = 'ABCDEFGHIJKLMNOPQRSVWXYZabcdefghijklmnopqrsvwxyz';
    if (number) {
      str += '0123456789';
    }
    if (character) {
      str += '@/>+:^&$#';
    }

    for (let i = 0; i < length; i++) {
      let charIndex = Math.floor(Math.random() * str.length);
      pass += str.charAt(charIndex);
    }
    setPassword(pass);
  }, [length, number, character]);

  // Copy Password to Clipboard
  const copyPassword = useCallback(() => {
    if (passwordRef.current) {
      passwordRef.current.select();
      navigator.clipboard.writeText(password);
    }
  }, [password]);

  // Regenerate password when dependencies change
  useEffect(() => {
    PasswordGen();
  }, [length, number, character, PasswordGen]);

  return (
    <>
      <div className="w-full max-w-md mx-auto shadow-md rounded-lg px-4 my-8 text-orange-500 bg-gray-700">
        <h1 className="text-white text-center my-3">Password Generator</h1>
        <div className="flex shadow rounded-lg overflow-hidden">
          <input
            type="text"
            value={password}
            placeholder="Password"
            readOnly
            ref={passwordRef}
            className="flex-1 px-2 py-1"
          />
          <button
            onClick={copyPassword}
            className="outline-none bg-blue-700 text-white px-3 py-0.5 shrink-0"
          >
            Copy
          </button>
        </div>
        <div className="flex flex-col text-sm gap-y-4 mt-4">
          <div className="flex items-center gap-x-2">
            <input
              type="range"
              min="5"
              max="50"
              value={length}
              className="cursor-pointer"
              onChange={(e) => setLength(Number(e.target.value))}
            />
            <label>Length: {length}</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={number}
              id="numberInput"
              onChange={() => setNumber((prev) => !prev)}
            />
            <label htmlFor="numberInput">Numbers</label>
          </div>
          <div className="flex items-center gap-x-1">
            <input
              type="checkbox"
              checked={character}
              id="characterInput"
              onChange={() => setCharacter((prev) => !prev)}
            />
            <label htmlFor="characterInput">Special Characters</label>
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
