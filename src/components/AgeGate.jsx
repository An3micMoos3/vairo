import { useState } from "react";

const KEY = "viro-age-ok";
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

// Has this browser confirmed its age in the last 30 days?
function readOk() {
  try {
    const saved = Number(localStorage.getItem(KEY));
    return Boolean(saved) && Date.now() - saved < THIRTY_DAYS;
  } catch {
    return false;
  }
}

function AgeGate({ children }) {
  const [ok, setOk] = useState(readOk);
  const [denied, setDenied] = useState(false);

  function accept() {
    try { localStorage.setItem(KEY, String(Date.now())); } catch {}
    setOk(true);
  }

  if (ok) return children;

  return (
    <div className="gate">
      <div className="gate-box">
        <h1>Viro Vapes</h1>
        {denied ? (
          <>
            <p>Sorry, you must be 18 or older to enter this site.</p>
            <button className="link" onClick={() => setDenied(false)}>Go back</button>
          </>
        ) : (
          <>
            <p>This site sells age-restricted products. Are you 18 years or older?</p>
            <div className="gate-actions">
              <button className="add" onClick={accept}>Yes, I'm 18+</button>
              <button className="variant" onClick={() => setDenied(true)}>No</button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default AgeGate;