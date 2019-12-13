import React from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { MdPerson, MdLineStyle, MdCreate, MdHelp } from 'react-icons/md';

import { signOut } from '~/store/modules/auth/actions';

import logoAdmin from '~/assets/logo-header.png';
import { Container, Profile, Content } from './styles';

export default function Header() {
    const dispatch = useDispatch();
    // const profile = useSelector(state => state.user.profile);

    function handleSignOut() {
        dispatch(signOut());
    }
    return (
        <Container>
            <Content>
                <nav>
                    <img src={logoAdmin} alt="GimPoint" />
                    <Link to="/students">
                        <MdPerson size={18} color="#999" /> ALUNOS
                    </Link>
                    <Link to="/plans">
                        <MdLineStyle size={18} color="#999" /> PLANOS
                    </Link>
                    <Link to="/dashboard">
                        <MdCreate size={18} color="#999" /> MATRICULAS
                    </Link>
                    <Link to="/dashboard">
                        <MdHelp size={18} color="#999" /> PEDIDOS DE AUXILIO
                    </Link>
                </nav>

                <aside>
                    <Profile>
                        <div>
                            <strong> Vady Varela </strong>
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
