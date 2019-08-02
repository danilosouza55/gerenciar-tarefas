import React, {Component} from 'react';

import {Container, Row, Form, FormGroup, Label, Input, Button, Alert} from "reactstrap";
import api from '../../services/Api';
import Header from '../../components/Header';


export default class TarefaForm extends Component {
    state = {
        titulo: '',
        descricao: '',
        concluida: false
    };

    constructor(props) {
        super(props);
        this.idtarefa = props.match.params.tarefaId;
    }

    componentDidMount() {
        const idtarefa = this.idtarefa;
        if (!idtarefa) {
            return;
        }

        api.get(`tarefas/${idtarefa}`)
            .then(response => {
                console.log('response data', response.data);

                const {titulo, descricao, concluida} = response.data;

                console.log(titulo, descricao, concluida);
                ;

                this.setState({titulo, descricao, concluida})
            })
            .catch(err => {
                if (err.response && err.response.status !== 404) {
                    window.alert('erro');
                    console.warn(err);
                }
            })
    }

    handleGravar = async e => {
        e.preventDefault();

        const {titulo, descricao, concluida} = this.state;

        let camposValidar = [titulo, descricao]
        for (let i in camposValidar) {
            if (!camposValidar[i]) {
                this.setState({error: 'Preencha todos os campos!'});
                return;
            }
        }

        try {
            if (this.idtarefa) {
                await api.put(`tarefas/${this.idtarefa}`, {titulo, descricao, concluida});
            } else {
                await api.post('tarefas', {titulo, descricao, concluida});
            }
            this.props.history.push('/tarefas');
        } catch (err) {
            let errorMsg = 'Houve um problema ao gravar o usuário';

            this.setState({
                error: errorMsg
            });

            console.error(err);
        }
    }

    render() {
        return (
            <>
                <Header/>
                <Container>
                    <h1>{this.idtarefa ? 'Editar' : 'Cadastrar'} uma tarefa</h1>

                    {this.state.error && <Alert color="danger">{this.state.error}</Alert>}

                    <Form onSubmit={this.handleGravar}>
                        <Row>
                            {this.idtarefa ? <Input type="hidden" value={this.idtarefa}/> : ''}
                            <FormGroup check>
                                <Label check>
                                    <Input type="hidden" name="concluida" value="false"/>
                                    <Input
                                        type="checkbox"
                                        name="concluida"
                                        value="true"
                                        checked={this.state.concluida}
                                        onChange={e => this.setState({concluida: e.target.checked})}
                                    />{' '}
                                    Concluída
                                </Label>
                            </FormGroup>
                        </Row>

                        <Row>
                            <FormGroup>
                                <Label for="titulo">Título</Label>
                                <Input
                                    type="text"
                                    name="titulo"
                                    id="titulo"
                                    value={this.state.titulo}
                                    onChange={e => this.setState({titulo: e.target.value})}
                                />
                            </FormGroup>
                            <FormGroup className="col-12">
                                <Label for="descricao">Descrição</Label>
                                <Input
                                    type="textarea"
                                    name="descricao"
                                    id="descricao"
                                    value={this.state.descricao}
                                    onChange={e => this.setState({descricao: e.target.value})}
                                />
                            </FormGroup>
                        </Row>
                        <Button>Enviar</Button>
                    </Form>
                </Container>
            </>
        );
    }
}
