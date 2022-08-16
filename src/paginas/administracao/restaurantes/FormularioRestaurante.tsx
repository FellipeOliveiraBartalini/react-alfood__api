import React, { useEffect, useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function FormularioRestaurante() {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            axios.get(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`)
                .then(resposta => {
                    setNomeRestaurante(resposta.data.nome);
                })
                .catch(error => {
                    console.error('error', error);
                    
                });
        }
    }, [parametros]);

    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parametros.id) {
            axios.put(`http://localhost:8000/api/v2/restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
            .then(resposta => {
                alert('Restaurante atualizado com sucesso!');
            })
            .catch(error => {
                console.error('error: ', error);
            });
        } else {
            axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nomeRestaurante })
                .then(resposta => {
                    alert('Restaurante cadastrado com sucesso!');
                })
                .catch(error => {
                    console.error('error: ', error);
                });
        }


    };

    return (
        <form onSubmit={event => aoSubmeterForm(event)}>
            <TextField
                label="Nome do Restaurante"
                variant="standard"
                value={nomeRestaurante}
                onChange={event => setNomeRestaurante(event?.target.value)}
            />
            <Button type='submit' variant="outlined">Salvar</Button>
        </form>
    );
}
