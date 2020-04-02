import React,{useState} from'react';
import {FiArrowDownLeft} from 'react-icons/fi'; 
import {Link,useHistory} from 'react-router-dom';
import './styles.css';
import api from '../../services/api';
import logoImg from '../../assets/logo.svg';

export default function NovosCasos(){
    const[titulo,setTitulo]=useState('');
    const[descricao,setDescricao]=useState('');
    const[value,setValue]=useState('');
    const OngId = localStorage.getItem('OngId');
    const history= useHistory();

    async function handleNovoCaso(e){
        e.preventDefault();

        const data ={
            titulo,
            descricao,
            value,
        };
        try{
            await api.post('casos',data,{
                headers:{
                    logado: OngId,
                }
            })
            history.push('/perfil');

        }catch{
            alert('Erro ao cadastrar Caso, tente Novamente!')
        }


    }
    return(
        <div className="novoscasos-container">
    
            <div className="content">
                <section>
                    <img src={logoImg} alt="Logo seja um heróri"/>
                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detlalhadamente para encontrar um herói para resolver algo </p>
                    <Link className="back-link" to="/profile">
                    <FiArrowDownLeft size={16} color="#e02041"/>
                    Voltar para Home
                    </Link>
                </section>
                <form onSubmit={handleNovoCaso}>
                    <input
                    placeholder="Título do caso"
                    value={titulo}
                    onChange={e => setTitulo(e.target.value)}

                    />
                    <textarea 
                    placeholder="Descrição"
                    value={descricao}
                    onChange={e => setDescricao(e.target.value)}
                    />
                    <input 
                    placeholder="Valor em Reais"
                    value={value}
                    onChange={e => setValue(e.target.value)}
                    />
                    
                    <button className="button" type="submit">Cadastrar</button>             
                </form>    
                
            </div>
        </div>
    );
}
