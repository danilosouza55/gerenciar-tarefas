import React, {Component} from 'react';
import {Table, Button} from 'reactstrap';

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

    handleExcluir = async tarefa => {
        api.delete(`tarefas/${tarefa.id}`)
            .then(response => {

                let dado = this.state.tasks;
                dado.splice(dado.indexOf(tarefa), 1)
                console.log(dado);
                this.setState({dado})
            })
            .catch(err => {
                window.alert('erro');
                console.warn(err);
            })
    };

    handleConcluir = async tarefa => {
        api.put(`tarefas/${tarefa.id}/concluida`)
            .then(response => {

                let dado = this.state.tasks;
                const idx = dado.indexOf(tarefa);
                dado[idx].concluida = true;

                this.setState({dado});
            })
    };

    handleDesmarcar = async tarefa => {
        api.delete(`tarefas/${tarefa.id}/concluida`)
            .then(response => {

                let dado = this.state.tasks;
                const idx = dado.indexOf(tarefa);
                dado[idx].concluida = false;

                this.setState({dado});
            })
    }

    renderTasks = () => {
        const {tasks} = this.state;

        const tasksItems = tasks.map((tarefa) => {
            return (
                <tr key={tarefa.id}>
                    <td>
                        <NavLink href={'/tarefas/addEdit/' + tarefa.id}>
                            {tarefa.id}
                        </NavLink>
                    </td>
                    <td>
                        <NavLink href={'/tarefas/addEdit/' + tarefa.id}>
                            {tarefa.titulo}
                        </NavLink>
                    </td>
                    <td>
                        {tarefa.concluida
                            ?
                            <Button color="success" onClick={() => this.handleDesmarcar(tarefa)}>
                                <span role="img" aria-label="Não">SIM</span>
                            </Button>
                            :
                            <Button color="danger" onClick={() => this.handleConcluir(tarefa)}>
                                <span role="img" aria-label="Não">NÃO</span>
                            </Button>}
                    </td>
                    <td>
                        <NavLink href={'/tarefas/addEdit/' + tarefa.id}>
                            {tarefa.usuarioId}
                        </NavLink>
                    </td>
                    <td>
                        <Button color="danger" onClick={() => this.handleExcluir(tarefa)}>Excluir</Button>{' '}
                    </td>
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
