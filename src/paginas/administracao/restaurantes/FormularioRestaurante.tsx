import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import axios from 'axios';

export default function FormularioRestaurante() {
    const [nomeRestaurante, setNomeRestaurante] = useState('');

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        axios.post('http://localhost:8000/api/v2/restaurantes/', { nome: nomeRestaurante })
            .then(resposta => {
                alert('Restaurante cadastrado com sucesso!');
            })
            .catch(error => {
                console.error('error: ', error);
            });

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
