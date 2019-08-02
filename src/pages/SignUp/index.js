import React, {Component} from 'react';

import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormFeedback
} from 'reactstrap';

import InputMask from "react-input-mask";
import api from "../../services/Api";
import './index.css';

export default class SignIn extends Component {

    constructor(props) {
        super(props);
        this.state = {
            'nome': '',
            'email': '',
            'nascimento': '',
            'cpf': '',
            'senha': '',
            'error': '',
            validate: {
                emailState: '',
            },
        }
        this.handleChange = this.handleChange.bind(this);
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const {validate} = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({validate})
    }

    handleChange = async (event) => {
        const {target} = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const {name} = target;
        await this.setState({
            [name]: value,
        });
    }

    submitForm = async e => {
        e.preventDefault();
        const {email, senha, nome, cpf, nascimento} = this.state;
        if (((!email) || (!senha) || (!nome) || (!cpf) || (!nascimento))) {
            this.setState({error: "Preencha todos os campos para continuar!"});
        } else {
            try {
                const response = await api.post("usuarios", this.state);
                console.log(response)
                this.props.history.push("/");
            } catch (err) {
                this.setState({
                    error:
                    err.response.data
                });
            }
        }
    }

    render() {
        const {email, senha, nome, cpf} = this.state;

        return (
            <Container className="Cadastro">
                <h2>Cadastro Gratuito</h2>
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <Col>
                        {this.state.error && <p>{this.state.error}</p>}
                        <FormGroup>
                            <Label for="nome">Nome</Label>
                            <Input
                                type="string"
                                name="nome"
                                id="nome"
                                value={nome}
                                onChange={(e) => this.handleChange(e)}
                            />
                            <Label for="nascimento">Data de nascimento</Label>
                            <Input
                                type="text"
                                name="nascimento"
                                id="nascimento"
                                mask="99/99/9999"
                                maskChar={null}
                                tag={InputMask}
                                placeholder="01/01/1991"
                                onChange={e => this.setState({nascimento: e.target.value})}
                            />

                            <Label for="cpf">CPF</Label>
                            <Input
                                type="string"
                                name="cpf"
                                id="cpf"
                                mask="999.999.999-99"
                                maskChar={null}
                                tag={InputMask}
                                placeholder="###.###.###-##"
                                value={cpf}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label>Email</Label>
                            <Input
                                type="email"
                                name="email"
                                id="exampleEmail"
                                placeholder="teste@email.com"
                                value={email}
                                valid={this.state.validate.emailState === 'has-success'}
                                invalid={this.state.validate.emailState === 'has-danger'}
                                onChange={(e) => {
                                    this.validateEmail(e)
                                    this.handleChange(e)
                                }}
                            />
                            <FormFeedback valid>
                                Email valido.
                            </FormFeedback>
                            <FormFeedback>
                                Por favor insira um email valido.
                            </FormFeedback>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplesenha">Senha</Label>
                            <Input
                                type="password"
                                name="senha"
                                id="examplesenha"
                                placeholder="********"
                                value={senha}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Button
                        className="corButton"
                    >
                        Salvar
                    </Button>
                </Form>
            </Container>
        )
    }
}
