import React,{useEffect, useState} from 'react';
import {Link, useHistory}from 'react-router-dom';
import {FiPower, FiTrash2} from 'react-icons/fi';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';
import './styles.css';

export default function Profile(){
    const[casos,setCasos] =useState([]);
    const OngId = localStorage.getItem('OngId');
    const ongNome =localStorage.getItem('OngNome');
    const history = useHistory();

    useEffect(() => {
        api.get('perfil',{
            headers: {
                logado: OngId,
            }
        }).then(response =>{
            setCasos(response.data);
        })    
    },[OngId]);

    async function handleDeleteCaso(id){
            try{
                await api.delete(`casos/${id}`, {
                    headers: {
                        logado: OngId,
                    }
                });
                //essa linha faz deletar sem precisar carregar a página
                setCasos(casos.filter(caso=> caso.id !== id));
            }catch(err){
                alert('Erro ao deletar caso, tente novamente!');
            }
    }
    function handleLogout(){
        localStorage.clear();
        history.push('/');
    }


    return (
        <div className="profile-container">
            <header>
                <img src={logoImg} alt="Logo da Seja um Herói"/>
                     <span>Bem vindo, {ongNome}</span>
                <Link className="button" to="/casos/novo">Cadastrar novo Caso</Link>
                <button onClick={handleLogout} type="button">
                    <FiPower size={18} color="#E020041"/>
                </button>
            </header>
            <h1>Casos Cadastrados</h1>
            <ul>
                {casos.map(caso =>(
                    <li key={caso.cod}>
                    <strong>CASO: </strong>
                    <p>{caso.titulo}</p>
                    <strong>DESCRIÇÃO:</strong>
                        <p>{caso.descricao}</p>
                    <strong>VALOR:</strong>
                    <p>{Intl.NumberFormat('pt-br',{style:'currency', currency:'Brl'}).format(caso.value)}</p>
                    <button onClick={()=> handleDeleteCaso(caso.id)} type="button">
                        <FiTrash2 size={20} color="#a8a8b3"/>
                    </button>
                </li>
                ) )}             
            </ul>
        </div>  
    );
}