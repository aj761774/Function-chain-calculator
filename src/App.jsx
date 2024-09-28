import { useMemo, useRef, useState } from "react";
import "./App.css";
import Card from "./components/Card";

const initialData = [
  {
    id: "1",
    functionNumber: 1,
    nextFunctionNumber: 2,
    equation: "x^2"
  },
  {
    id: "2",
    functionNumber: 2,
    nextFunctionNumber: 4,
    equation: "2*x + 4"
  },
  {
    id: "3",
    functionNumber: 3,
    nextFunctionNumber: null,
    equation: "x^2 + 20"
  },
  {
    id: "4",
    functionNumber: 4,
    nextFunctionNumber: 5,
    equation: "x-2"
  },
  {
    id: "5",
    functionNumber: 5,
    nextFunctionNumber: 3,
    equation: "x/2"
  }
];

function isValidExpression(expression) {
  const regex = /^\s*([-+]?\s*(\d+(\.\d+)?|x(\^\d+)?)(\s*[-+*/^]\s*([-+]?\s*(\d+(\.\d+)?|x(\^\d+)?)))*\s*)$/;
  return regex.test(expression);
}

function App() {
  const [data, setData] = useState(initialData);
  const [errors, setErrors] = useState([]);
  const [x, setX] = useState(3);
  let timerRef = useRef(null);

  const handleCardInputChange = (index, e) => {
    setData(prev => {
      const newData = [...prev];
      newData[index].equation = e.target.value;
      return newData;
    });
    if (timerRef.current) clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      const isValid = isValidExpression(e.target.value);
        setErrors(prev => {
          const err = [...prev];
          err[index] = !isValid
            ? "Invalid equation"
            : "";
          return err;
        });  
    }, 10);
  };

  const handleChange = (e, isResultInput) => {
    if(isResultInput) return;
    const val = e.target.value;
    if(!isNaN(val)){
      setX(val);
    }
  };

  const result = useMemo(()=> {
    if(errors.join("").length) return;
    // const executionOrderOfFunctions = [1, 2, 4, 5, 3];
    let currentFunctionNumber = 1;
    let res = x;
    while(currentFunctionNumber){
      try {
        res = eval(data[currentFunctionNumber-1].equation.replace('x', res).replace("^", "**"));
        currentFunctionNumber = data[currentFunctionNumber-1].nextFunctionNumber;
      }
      catch(e){
        return "invalid input";
      }
    }
    return res;
    
  }, [data, errors, x]);

  return (
    <div className="display-flex flex-wrap justify-center cards-container">
      {data.map((card, index) => {
        return index === 0 || index === 2
          ? <div key={card.id} className={`display-flex card-with-intial-input-or-result ${ index === 2 ? "result-card" : ""}`}>
              <Card
                err={errors[index]}
                x={index === 0 ? x : undefined}
                cardData={card}
                index={index}
                handleCardInputChange={handleCardInputChange}
              />
              <div className="initial-value-or-result-input display-flex align-center">
               <input type="text" value={index === 2 ? result : x } onChange={(e)=> handleChange(e, index === 2)} title={index === 2 ? result : x}/>
               <div><div className="circle" id={`input-output-circle-${index}`}/></div>
              </div>
            </div>
          : <Card
              key={card.id}
              err={errors[index]}
              x={index === 0 ? x : undefined}
              cardData={card}
              index={index}
              handleCardInputChange={handleCardInputChange}
            />;
      })}
    </div>
  );
}

export default App;
