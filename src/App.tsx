import { useState } from 'react';
import { Delete, Calculator, History } from 'lucide-react';

type Operation = '+' | '-' | '*' | '/' | null;

export default function App() {
  const [currentOperand, setCurrentOperand] = useState('0');
  const [previousOperand, setPreviousOperand] = useState<string | null>(null);
  const [operation, setOperation] = useState<Operation>(null);
  const [history, setHistory] = useState<string[]>([]);
  const [showHistory, setShowHistory] = useState(false);

  const clear = () => {
    setCurrentOperand('0');
    setPreviousOperand(null);
    setOperation(null);
  };

  const deleteNumber = () => {
    if (currentOperand === '0') return;
    if (currentOperand.length === 1) {
      setCurrentOperand('0');
    } else {
      setCurrentOperand(currentOperand.slice(0, -1));
    }
  };

  const appendNumber = (number: string) => {
    if (number === '.' && currentOperand.includes('.')) return;
    if (currentOperand === '0' && number !== '.') {
      setCurrentOperand(number);
    } else {
      setCurrentOperand(currentOperand + number);
    }
  };

  const chooseOperation = (selectedOperation: Operation) => {
    if (currentOperand === '0' && previousOperand === null) return;
    
    if (previousOperand !== null) {
      calculate();
    }
    
    setOperation(selectedOperation);
    setPreviousOperand(currentOperand);
    setCurrentOperand('0');
  };

  const calculate = () => {
    if (operation === null || previousOperand === null) return;

    const prev = parseFloat(previousOperand);
    const current = parseFloat(currentOperand);
    if (isNaN(prev) || isNaN(current)) return;

    let result = 0;
    switch (operation) {
      case '+':
        result = prev + current;
        break;
      case '-':
        result = prev - current;
        break;
      case '*':
        result = prev * current;
        break;
      case '/':
        result = prev / current;
        break;
    }

    const resultString = result.toString();
    const calculationString = `${prev} ${operation} ${current} = ${resultString}`;
    
    setHistory(prevHistory => [calculationString, ...prevHistory].slice(0, 10));
    setCurrentOperand(resultString);
    setOperation(null);
    setPreviousOperand(null);
  };

  const formatNumber = (number: string) => {
    const floatNumber = parseFloat(number);
    if (isNaN(floatNumber)) return '';
    return floatNumber.toLocaleString('en-US', {
      maximumFractionDigits: 6,
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-800 flex items-center justify-center p-4">
      <div className="bg-gray-950 p-6 rounded-3xl shadow-2xl w-full max-w-sm border border-gray-800">
        
        {/* Header */}
        <div className="flex justify-between items-center mb-6 text-gray-400">
          <div className="flex items-center gap-2">
            <Calculator className="w-5 h-5 text-indigo-500" />
            <span className="text-sm font-medium">Calculator</span>
          </div>
          <button 
            onClick={() => setShowHistory(!showHistory)}
            className={`p-2 rounded-full transition-colors ${showHistory ? 'text-indigo-400 bg-indigo-500/10' : 'hover:text-white'}`}
          >
            <History className="w-5 h-5" />
          </button>
        </div>

        {/* Display */}
        <div className="relative mb-6">
          {showHistory && (
            <div className="absolute inset-0 bg-gray-900/95 backdrop-blur-sm rounded-2xl z-10 p-4 overflow-y-auto border border-gray-800">
              <h3 className="text-gray-400 text-xs uppercase tracking-wider mb-3">History</h3>
              <div className="space-y-2">
                {history.length === 0 ? (
                  <p className="text-gray-600 text-sm text-center py-4">No history yet</p>
                ) : (
                  history.map((item, idx) => (
                    <div key={idx} className="text-right">
                      <div className="text-indigo-300 text-sm">{item}</div>
                      <div className="w-full h-px bg-gray-800 mt-2"></div>
                    </div>
                  ))
                )}
              </div>
            </div>
          )}
          
          <div className="bg-gray-900 rounded-2xl p-6 text-right shadow-inner border border-gray-800">
            <div className="text-gray-500 text-sm h-6 mb-1 font-mono">
              {previousOperand} {operation}
            </div>
            <div className="text-white text-4xl font-light tracking-tight overflow-x-auto scrollbar-hide">
              {formatNumber(currentOperand)}
            </div>
          </div>
        </div>

        {/* Keypad */}
        <div className="grid grid-cols-4 gap-3">
          <button onClick={clear} className="col-span-2 bg-rose-500/10 text-rose-500 hover:bg-rose-500/20 py-4 rounded-xl font-semibold transition-all active:scale-95">AC</button>
          <button onClick={deleteNumber} className="bg-gray-800 text-gray-300 hover:bg-gray-700 py-4 rounded-xl flex items-center justify-center transition-all active:scale-95">
            <Delete className="w-5 h-5" />
          </button>
          <button onClick={() => chooseOperation('/')} className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 py-4 rounded-xl text-xl font-semibold transition-all active:scale-95">÷</button>

          <button onClick={() => appendNumber('7')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">7</button>
          <button onClick={() => appendNumber('8')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">8</button>
          <button onClick={() => appendNumber('9')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">9</button>
          <button onClick={() => chooseOperation('*')} className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 py-4 rounded-xl text-xl font-semibold transition-all active:scale-95">×</button>

          <button onClick={() => appendNumber('4')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">4</button>
          <button onClick={() => appendNumber('5')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">5</button>
          <button onClick={() => appendNumber('6')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">6</button>
          <button onClick={() => chooseOperation('-')} className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 py-4 rounded-xl text-xl font-semibold transition-all active:scale-95">−</button>

          <button onClick={() => appendNumber('1')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">1</button>
          <button onClick={() => appendNumber('2')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">2</button>
          <button onClick={() => appendNumber('3')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">3</button>
          <button onClick={() => chooseOperation('+')} className="bg-indigo-500/10 text-indigo-400 hover:bg-indigo-500/20 py-4 rounded-xl text-xl font-semibold transition-all active:scale-95">+</button>

          <button onClick={() => appendNumber('0')} className="col-span-2 bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">0</button>
          <button onClick={() => appendNumber('.')} className="bg-gray-800 text-white hover:bg-gray-700 py-4 rounded-xl text-xl font-medium transition-all active:scale-95 shadow-sm">.</button>
          <button onClick={calculate} className="bg-indigo-600 text-white hover:bg-indigo-500 py-4 rounded-xl text-xl font-semibold transition-all active:scale-95 shadow-lg shadow-indigo-500/20">=</button>
        </div>
      </div>
    </div>
  );
}