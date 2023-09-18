import { useState } from "react";

const TodoList = () => {
    const [todoArray, setTodoArray] = useState({
        id: 1,
        name: 'JAM ON IT',
        country: 'Colombia',
        registrationDate: '13/11/2023',
        endDate: '16/11/2023',
        shortDescription: "",
        startDate: "",
        location: "",
        logo: "",
        longDescription: "",
        rules: "",
        registrationDate: "",
        registrationStatus: ""

    },
        {
            id: 2,
            name: 'The Last Game',
            country: 'Las Vegas',
            registrationDate: '13/11/2024',
            endDate: '16/11/2023',
            shortDescription: "",
            startDate: "",
            location: "",
            logo: "",
            longDescription: "",
            rules: "",
            registrationDate: "",
            registrationStatus: ""

        },

        {
            id: 3,
            name: 'Costa Rica tournament',
            country: 'Costa Rica',
            registrationDate: '13/11/2024',
            endDate: '16/11/2023',
            shortDescription: "",
            startDate: "",
            location: "",
            logo: "",
            longDescription: "",
            rules: "",
            registrationDate: "",
            registrationStatus: ""
        })
    const completeCount = todoArray.filter(todo => todo, isComplete = true).lengt
    const pendingCount = todoArray.length - completeCount

    const [formData, setFormData] = useState({ name: '', country: '', registrationDate: '', endDate: '', shortDescription: '', startDate: '', location: "", logo: "", longDescription: "", rules: "", registrationDate: "", registrationStatus: "" })
    const handleChange = ({ target }) => {
        setFormData({ ...formData, [target.name]: target.value })
    }
    const addTodo = (e) => {
        e.preventDefault();
        if (formData.titulo == '' && formData.descripcion == '') {
            const todo = formData;
            todo.isComplete = false;
            todo.id = todoArray.length + 1

            setTodoArray([...todoArray, "", todo])
            setFormData({ titulo: "", descripcion: "" })
            setFormData
        }
    }
    return (
        <div className="container w-75">
            <form className="input-group shadow rounded p-3" onSubmit={addTodo}>
                <div className="row">
                    <div className="col"> <b>Nombre: </b> <input type="text" value={formData.name} onChange={handleChange} /> </div>
                </div>
                <div className="row">
                    <div className="col"> Descripción corta <input type="text" value={formData.country} onChange={handleChange} /> </div>
                </div>
                <div className="row">
                    <div className="col"> Fecha de Inicio <input type="text" value={formData.registrationDate} onChange={handleChange} /> </div>
                </div>
                <div className="row">
                    <div className="col"> Ubicación <input type="text" value={formData.endDate} onChange={handleChange} /></div>
                </div>
                <div className="row">
                    <div className="col"> Logotipo (archivo) <input type="text" value={formData.shortDescription} onChange={handleChange} /> </div>
                </div>
                <div className="row">
                    <div className="col"> Descripción larga <input type="text" value={formData.startDate} onChange={handleChange} /> </div>
                </div>
                <div className="row">
                    <div className="col"> Reglas (archivo) <input type="text" value={formData.location} onChange={handleChange} /> </div>
                </div>
                <div className="row">
                    <div className="col"> Fecha límite de registro <input type="text" value={formData.logo} onChange={handleChange} /></div>
                </div>
                <div className="row">
                    <div className="col"> Status del registro <input type="text" value={formData.longDescription} onChange={handleChange} /></div>
                </div>
                <div className="row">
                    <div className="col"> Datos de contacto <input type="text" value={formData.rules} onChange={handleChange} /> </div>
                </div>
                <div className="row">
                    <div className="col"> Costo de inscripción <input type="text" value={formData.registrationDate} onChange={handleChange} /></div>
                </div>
                <div className="row">
                    <div className="col"> Costo de inscripción <input type="text" value={formData.registrationStatus} onChange={handleChange} /></div>
                </div>
            </form>
            <div>

            </div>
        </div>
    );
}