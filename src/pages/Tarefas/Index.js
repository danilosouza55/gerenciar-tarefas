import React, {Component} from 'react';
import {Table} from 'reactstrap';

import {
    NavLink
} from 'reactstrap';

import Header from '../../components/Header'
import api from "../../services/Api";

export default class Index extends Component {

    state = {
        tasks: []
    };

    componentDidMount() {
        api.get('/tarefas')
            .then(response => {
                const {data} = response;
                this.setState({
                    tasks: data
                })
            })
            .catch(err => {
                console.warn(err);
                alert(err.message)
            })
    }

    renderTasks = () => {
        const {tasks} = this.state;

        const tasksItems = tasks.map((task) => {
            return (
                <tr key={task.id}>
                    <td>{task.id}</td>
                    <td>
                        <NavLink href={'/tarefas/addEdit/' + task.id}>
                            {task.titulo}
                        </NavLink>
                    </td>
                    <td>{task.concluida ? 'Sim' : 'Não'}</td>
                    <td>{task.usuarioId}</td>
                </tr>
            )
        });

        return tasksItems;
    }

    render() {
        return (
            <div>
                <Header/>
                <h2>
                    Tarefas cadastradas
                    <div className="float-right">
                        <NavLink href={`/tarefas/addEdit`} className="btn btn-primary" color="success">Adicionar
                            tarefa</NavLink>
                    </div>
                </h2>

                <Table>
                    <thead>
                    <tr>
                        <th>#</th>
                        <th>Titulo</th>
                        <th>Concluido</th>
                        <th>Código Usuário</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderTasks()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
