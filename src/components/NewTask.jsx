import { useState } from "react"

function NewTask({onAdd}){

    const [enteredTask, setEnteredTask] = useState('')

    function handleChange(event){
        setEnteredTask(event.target.value)
    }

    function handleClick(){
        if(enteredTask.trim() !== ''){
            onAdd(enteredTask)
        setEnteredTask('')
        }
        
    }

    return <div className="flex items-center gap-4">
        <input type="text" className="w-64 px-2 py-1 rounded-sm bg-stone-200" onChange={handleChange} value={enteredTask}/>
        <button className="py-2 px-2 rounded-md bg-stone-700 text-stone-100 hover:bg-stone-950" onClick={handleClick}>Aufgabe hinzufügen</button>
    </div>
}

export default NewTask