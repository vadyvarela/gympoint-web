import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import { signOut } from '~/store/modules/auth/actions';

import logoAdmin from '~/assets/logo-header.png';
import { Container, Profile, Content } from './styles';

export default function Header() {
    const dispatch = useDispatch();
    const user = useSelector(state => state.auth.user);

    function handleSignOut() {
        dispatch(signOut());
    }
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logoAdmin} alt="GimPoint" />
                    <Link to="/dashboard">ALUNOS</Link>
                    <Link to="/dashboard">PLANOS</Link>
                    <Link to="/dashboard">MATRICULAS</Link>
                    <Link to="/dashboard">PEDIDOS DE AUXILIO</Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong> {user.name} </strong>
                            <button type="button" onClick={handleSignOut}>
                                sair do sistema
                            </button>
                        </div>
                    </Profile>
                </aside>
            </Content>
        </Container>
    );
}
