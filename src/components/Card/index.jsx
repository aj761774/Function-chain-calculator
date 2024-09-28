import "./style.css";
import dragIcon from "../..//assets/drag-icon.svg"
import { useEffect } from "react";
import { drawLineBetweenPoints } from "../../helper";

const Card = ({ cardData, handleCardInputChange, index, handleBlur, err }) => {

  const nextFunction = `Function: ${cardData?.nextFunctionNumber}`;

  useEffect(()=> {
    const drawLineForInitialInput =  ()=> {
        if(index === 0){
            const startElm = document.getElementById(`input-output-circle-${index}`); 
            // first card element
            const endElm = document.getElementById(`input-circle-${index}`);
            const x1 = startElm.getBoundingClientRect().x;
            const y1 = startElm.getBoundingClientRect().y;
            const x2 = endElm.getBoundingClientRect().x;
            const y2 =  endElm.getBoundingClientRect().y;
            drawLineBetweenPoints(x1,x2, y1, y2);
        }
    }
    const drawLineForOutput =  ()=> {
        if(index === 2){
            // 3rd card element
            const startElm = document.getElementById(`output-circle-${index}`);
            const endElm = document.getElementById(`input-output-circle-${index}`); 
            const x1 = startElm.getBoundingClientRect().x;
            const y1 = startElm.getBoundingClientRect().y;
            const x2 = endElm.getBoundingClientRect().x;
            const y2 =  endElm.getBoundingClientRect().y;
            drawLineBetweenPoints(x1,x2, y1, y2);
        }
 
    }
    const drawLine = (cardData) => {
        const elements = document.getElementsByClassName("line");
        if(elements.length === 6){
            // remove existing lines before redraw
            const elements = document.getElementsByClassName("line");
            while(elements.length > 0){
                elements[0].parentNode.removeChild(elements[0]);
            }
        }
        drawLineForInitialInput();
        drawLineForOutput();
        if(cardData && cardData.nextFunctionNumber){
            const startElm = document.getElementById(`output-circle-${index}`); 
            const endElm = document.getElementById(`input-circle-${cardData.nextFunctionNumber - 1}`); 
            const x1 = startElm.getBoundingClientRect().x;
            const y1 = startElm.getBoundingClientRect().y;
            const x2 = endElm.getBoundingClientRect().x;
            const y2 =  endElm.getBoundingClientRect().y;
            drawLineBetweenPoints(x1, x2, y1, y2)
    }
    }
    drawLine(cardData)
    window.addEventListener("resize", () => drawLine(cardData));
    return ()=> {
        window.removeEventListener("resize", () => drawLine(cardData))
    }
   
  }, [])

  return (
     <div className='card'>
        <div className="display-flex gap-5 function-number"><img src={dragIcon}/> Function: {cardData?.functionNumber}</div>
        <div className="input-container">
            <div>Equation</div>
            <input type="text" defaultValue={cardData.equation} onChange={(e)=> handleCardInputChange(index, e)}/>
            {err && <div className="err-msg">{err}</div>}
        </div>
        <div className="input-container">
            <div>Next Function</div>
            <select type="text" value={nextFunction} disabled>
                {cardData?.nextFunctionNumber && <option>{nextFunction}</option>}
            </select>
        </div>
        <div className="input-output display-flex justify--space-between">
         <div className="display-flex gap-5 align-center"><span className="circle" id={`input-circle-${index}`}/>input</div>
         <div className="display-flex gap-5 align-center">output<span className="circle" id={`output-circle-${index}`}/></div>
        </div>
     </div>
  )
}

export default Card