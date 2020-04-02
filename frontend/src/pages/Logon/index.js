import React,{useState} from 'react';
import {Link, useHistory} from 'react-router-dom';
//para importar os ícones do site https://feathericons.com/
import { FiLogIn } from 'react-icons/fi'; 

import api from '../../services/api';

import './styles.css';
import logoImg from '../../assets/logo.svg'
import heroesImg from '../../assets/heroes.png'

export default function Logon(){
    const [id,setId] = useState('');
    const history=useHistory();

    async function handleLogin(e){
       e.preventDefault();
       try{
        const resp=await api.post('sessions',{ id});
        localStorage.setItem('OngId',id);
        localStorage.setItem('OngNome',resp.data.nome);
        history.push('/perfil');
       }catch(err){
           alert('Falha no Login, tente Novamente!');
       }
    }
    return(
        <div className="logon-container">
            <section className="form">
                <img src={logoImg} alt="Logo Seja um Herói"/>
                <form onSubmit={handleLogin}>
                    <h1>Faça seu Logon</h1>
                    <input placeholder="Sua ID"
                    value={id}
                    onChange = {e=> setId(e.target.value)}
                    />
                    <button className="button" type="submit">Entrar</button>
                    <Link className="back-link" to="/register">
                        <FiLogIn size={16} color="#e02041"/>
                        Não tenho cadastro
                    </Link>
                </form>
            </section>
            <img src={heroesImg} alt="Heroes" />
        </div>
    );
}