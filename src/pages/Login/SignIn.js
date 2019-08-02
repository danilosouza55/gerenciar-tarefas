import React, { Component } from 'react';
import {
    Container, Col, Form,
    FormGroup, Label, Input,
    Button, FormText, FormFeedback,
} from 'reactstrap';
import './SignIn.css';
import { Link } from "react-router-dom";

import api from "../../services/Api";
import { login } from "../../services/Auth";

class SignIn extends Component {
    constructor(props) {
        super(props);
        this.state = {
            'email': '',
            'password': '',
            'error': '',
            validate: {
                emailState: '',
            },
        }
        this.handleChange = this.handleChange.bind(this);
    }

    validateEmail(e) {
        const emailRex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { validate } = this.state
        if (emailRex.test(e.target.value)) {
            validate.emailState = 'has-success'
        } else {
            validate.emailState = 'has-danger'
        }
        this.setState({ validate })
    }

    handleChange = async (event) => {
        const { target } = event;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const { name } = target;
        await this.setState({
            [name]: value,
        });
    }

    submitForm = async e => {
        e.preventDefault();
        const { email, password } = this.state;
        if (!email || !password) {
            this.setState({ error: "Preencha e-mail e senha para continuar!" });
        } else {
            try {
                const response = await api.post("usuarios/login", {
                    email: email,
                    senha: password
                });
                login(response.data.token);
                this.props.history.push("/");
            } catch (err) {
                this.setState({
                    error:
                        "Houve um problema com o login, verifique suas credenciais."
                });
            }
        }
    }

    render() {
        const { email, password } = this.state;
        return (
            <Container className="Login">
                <h2>Login</h2>
                <Form className="form" onSubmit={(e) => this.submitForm(e)}>
                    <Col>
                        {this.state.error && <p>{this.state.error}</p>}
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
                            <FormText>Insira seu email</FormText>
                        </FormGroup>
                    </Col>
                    <Col>
                        <FormGroup>
                            <Label for="examplePassword">Senha</Label>
                            <Input
                                type="password"
                                name="password"
                                id="examplePassword"
                                placeholder="********"
                                value={password}
                                onChange={(e) => this.handleChange(e)}
                            />
                        </FormGroup>
                    </Col>
                    <Button
                        className="corButton"
                    >
                        Entrar
                    </Button>
                    <div className="Cadastro">
                        <Link to="/signup">Criar conta grátis</Link>
                    </div>
                </Form>
            </Container>
        );
    }
}

export default SignIn;