import React, {Component} from 'react';

import {
    Navbar, NavbarBrand, Nav,
    NavLink, NavItem
} from 'reactstrap';

import {logout} from '../services/Auth';

export default class Header extends Component {

    onClickSair = () => {
        logout();
        this.props.history.push('/');
    }

    render() {
        return (
            <div>
                <Navbar color="light" expand="xs">
                    <NavbarBrand href="/">Gerenciador de Tarefas</NavbarBrand>
                    <Nav className="ml-auto" navbar>
                        <NavItem>
                            <NavLink href="/tarefas/">Lista de Tarefas</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="/usuarios/">Lista de Usuários</NavLink>
                        </NavItem>
                        <NavItem>
                            <NavLink href="#" onClick={this.onClickSair}>Sair</NavLink>
                        </NavItem>
                    </Nav>
                </Navbar>
            </div>
        );
    }
}