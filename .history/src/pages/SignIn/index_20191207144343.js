import React from 'react';
// import { useDispatch, useSelector } from 'react-redux';
import { Form, Input } from '@rocketseat/unform';
import * as Yup from 'yup';

// import { signInRequest } from '~/store/modules/auth/actions';
// import logo from '~/assets/logo.svg';

const schema = Yup.object().shape({
    email: Yup.string()
        .email('Insira um e-mail valido')
        .required('O e-mail é obrigatório'),
    password: Yup.string().required('A senha é obrigatória'),
});

export default function SignIn() {
    // const dispatch = useDispatch();
    // const loading = useSelector(state => state.auth.loading);

    // function handleSubmit({ email, password }) {
    //     // dispatch(signInRequest(email, password));
    // }
    return (
        <>
            {/* <img src={logo} alt="GymPoint" /> */}
            <Form schema={schema} onSubmit>
                <label htmlFor="email">
                    SEU E-MAIL
                    <Input
                        id="email"
                        name="email"
                        type="email"
                        placeholder="exemplo@email.com"
                    />
                </label>

                <label htmlFor="password"> SUA SENHA </label>
                <Input
                    id="password"
                    name="password"
                    type="password"
                    placeholder="**********"
                />

                <button type="submit">Entrar no sistema</button>
            </Form>
        </>
    );
}
