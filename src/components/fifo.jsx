// FIFOPageReplacement.js
import React, { useState } from 'react';
import './buttons.css'; // Import CSS file for styling

function FIFOPageReplacement() {
  const [pageFrames, setPageFrames] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [frameSize, setFrameSize] = useState(3);
  const [pageHits, setPageHits] = useState(0);
  const [pageFaults, setPageFaults] = useState(0);
  const [pageHitRatio, setPageHitRatio] = useState(0);
  const [isPageHitBlinking, setIsPageHitBlinking] = useState(false);

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleFrameSizeChange = (event) => {
    setFrameSize(parseInt(event.target.value, 10));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const page = inputValue.trim(); 
    if (page !== '') {
      if (pageFrames.includes(page)) {
        setPageHits(pageHits + 1);
        setIsPageHitBlinking(true);
        setTimeout(() => {
          setIsPageHitBlinking(false);
        }, 500);
      } else {
        setPageFaults(pageFaults + 1);
        let updatedFrames = [...pageFrames];
        if (updatedFrames.length >= frameSize) {
          updatedFrames.shift(); 
        }
        updatedFrames.push(page); 
        setPageFrames(updatedFrames);
      }
      setInputValue('');
    }
  };

  const calculatePageHitRatio = () => {
    const totalRequests = pageHits + pageFaults;
    if (totalRequests === 0) {
      setPageHitRatio(0);
    } else {
      setPageHitRatio((pageHits / totalRequests) * 100);
    }
  };

  return (
    <div className="fifo-container">
      <h1 className="fifo-header">FIFO Page Replacement Algorithm</h1>
      <form onSubmit={handleSubmit}>
        <div className="input-container">
          <label htmlFor="pageSequence">Page sequence</label>
          <input id="pageSequence" type="text" value={inputValue} onChange={handleInputChange} />
        </div>
        <div className="input-container">
          <label htmlFor="frameSize">Frame Size</label>
          <input id="frameSize" type="number" value={frameSize} onChange={handleFrameSizeChange} />
        </div>
        <button className="submit-button" type="submit">Submit</button>
      </form>
      <div className="page-frames">
        <h2>Page Frames</h2>
        <ul>
          {pageFrames.map((page, index) => (
            <li key={index} className={isPageHitBlinking && page === inputValue ? 'page-hit-blink' : ''}>{page}</li>
          ))}
        </ul>
      </div>
      <div className="page-hits-faults">
        <p>Page Hits: {pageHits}</p>
        <p>Page Faults: {pageFaults}</p>
        <button className="calculate-button" onClick={calculatePageHitRatio}>Calculate Page Hit Ratio</button>
        <p>Page Hit Ratio: {pageHitRatio.toFixed(2)}%</p>
      </div>
    </div>
  );
}

export default FIFOPageReplacement;
