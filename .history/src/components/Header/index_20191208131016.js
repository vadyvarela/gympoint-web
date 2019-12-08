import React from 'react';
// import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import logoPurple from '~/assets/logo-header.png';
import { Container, Profile, Content } from './styles';

export default function Header() {
    // const profile = useSelector(state => state.user.profile);

    return (
        <Container>
            <Content>
                <nav>
                    <img src={logoPurple} alt="" />
                    <Link to="/dashboard">ALUNOS</Link>
                    <Link to="/dashboard">PLANOS</Link>
                    <Link to="/dashboard">MATRICULAS</Link>
                    <Link to="/dashboard">PEDIDOS DE AUXILIO</Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong> Vady Varela </strong>
                            <button type="button">sair do sistema</button>
                        </div>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
