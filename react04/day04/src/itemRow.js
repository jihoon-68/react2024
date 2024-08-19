import { useState } from "react";

export default ({item,onDelete,onChangeCkb,oneModify})=>{
    const [flag, setFlag] =useState(false);
    const [savemodifyInput,setsavemodifyInput] =useState(item.title);
    const [modifyInput, setmodifyInput] =useState(savemodifyInput);
    return(
        <div className="input-group mb-3">
                <div className="input-group-prepend">
                    <div className="input-group-text">
                        <input type="checkbox" 
                        defaultChecked={item.done ? "checked":""} 
                        onClick={()=>{onChangeCkb(item.no)}}
                        />
                    </div>
                </div>
                <input type="text" className="form-control" 
                readOnly={flag ? "":"readOnly"} 
                value={modifyInput} 
                style={{textDecoration: item.done? "line-through":""}}
                onChange={(e)=>{setmodifyInput(e.target.value)}} 
                onFocus={()=>{setFlag(true)}}
                onBlur={()=>{
                    setFlag(false);
                    setsavemodifyInput(modifyInput)
                    setmodifyInput(item.title)
                    console.log(savemodifyInput);
                }}
                />
                <div className="input-group-append">
                    <button onClick={()=>{
                        oneModify(item.no, savemodifyInput)
                        setFlag(false)       
                    }} className="btn btn-primary" type="button">수정</button>  
                    <button onClick={()=>{onDelete(item.no)}} className="btn btn-danger" type="button" >삭제</button>  
                </div>
        </div>
    )
}