import React, {Component} from 'react';
import {Table} from 'reactstrap';

import Header from '../../components/Header'
import api from "../../services/Api";

export default class Index extends Component {

    state = {
        tasks: []
    };

    componentDidMount() {
        api.get('/usuarios')
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

    renderUsuarios = () => {
        const {tasks} = this.state;

        const usuariosItems = tasks.map((usuario) => {
            return (
                <tr key={usuario.id}>
                    <td>{usuario.id}</td>
                    <td>{usuario.nome}</td>
                    <td>{usuario.email}</td>
                    <td>{usuario.cpf}</td>
                    <td>{usuario.nascimento}</td>
                </tr>
            )
        });

        return usuariosItems;
    }

    render() {
        return (
            <div>
                <Header/>
                <h2>
                    Usuarios cadastradas
                </h2>

                <Table>
                    <thead>
                    <tr>
                        <th>Id</th>
                        <th>Nome</th>
                        <th>E-mail</th>
                        <th>CPF</th>
                        <th>Data de nascimento</th>
                    </tr>
                    </thead>
                    <tbody>
                    {this.renderUsuarios()}
                    </tbody>
                </Table>
            </div>
        );
    }
}
