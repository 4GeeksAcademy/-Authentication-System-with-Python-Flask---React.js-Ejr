import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import "../../styles/home.css";


export const Home = () => {
	const { store, actions } = useContext(Context);
	const [todo, setTodo] = useState('')
	const [list, setList] = useState([])


	const createTodo = () => {
		e.preventDefault()
		let newTodo = setTodo('e.target.todoInput.value')
		setList(...todo, newTodo)
		}


	const removeTodo = (index) => {
		e.preventDefault()
		let filtered = todo.filter((i) => i !== index)
		setList(filtered)
		}


	fetch('https://www.boredapi.com/api/activity')




	return (
		<div className="text-center mt-5">
			<h1>Bored? Need Something todo?</h1>
			<div className="container bg-light">
				
			<form onSubmit={createTodo}>
            <input 
            className="input"
            name="todoInput" 
            type="text"
            placeholder="add new task" 
            >
            </input>
            </form>

			
			<ul>
                {list.map((list,index)=> {

                    return(
                        <li className="theList d-flex justify-content-between"
                            key={index}>
                            {list}
                            <button className='button mr-1 float-right end-0' type="button" onClick={(e) => removeTodo(e,index)}>
                            	<i className="fas fa-times"></i>
                            </button>
                        </li>
                    )
                })}
            </ul>
			</div>
		</div>
	);
};
