import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import http from '../../../http';

export default function FormularioRestaurante() {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get(`restaurantes/${parametros.id}/`)
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
            http.put(`restaurantes/${parametros.id}/`, { nome: nomeRestaurante })
                .then(resposta => {
                    alert('Restaurante atualizado com sucesso!');
                })
                .catch(error => {
                    console.error('error: ', error);
                });
        } else {
            http.post('restaurantes/', { nome: nomeRestaurante })
                .then(resposta => {
                    alert('Restaurante cadastrado com sucesso!');
                })
                .catch(error => {
                    console.error('error: ', error);
                });
        }


    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant='h6'>Formulário de Restaurante</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    label="Nome do Restaurante"
                    variant="standard"
                    value={nomeRestaurante}
                    onChange={event => setNomeRestaurante(event?.target.value)}
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    );
}
