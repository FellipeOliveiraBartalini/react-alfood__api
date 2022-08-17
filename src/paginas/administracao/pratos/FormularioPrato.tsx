import React, { useEffect, useState } from 'react';
import { Box, Button, TextField, Typography } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import http from '../../../http';

export default function FormularioPrato() {
    const parametros = useParams();

    useEffect(() => {
        if (parametros.id) {
            http.get(`pratos/${parametros.id}/`)
                .then(resposta => {
                    setNomePrato(resposta.data.nome);
                })
                .catch(error => {
                    console.error('error', error);

                });
        }
    }, [parametros]);

    const [nomePrato, setNomePrato] = useState('');

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        if (parametros.id) {
            http.put(`pratos/${parametros.id}/`, { nome: nomePrato })
                .then(resposta => {
                    alert('Prato atualizado com sucesso!');
                })
                .catch(error => {
                    console.error('error: ', error);
                });
        } else {
            http.post('pratos/', { nome: nomePrato })
                .then(resposta => {
                    alert('Prato cadastrado com sucesso!');
                })
                .catch(error => {
                    console.error('error: ', error);
                });
        }


    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexGrow: 1 }}>
            <Typography component="h1" variant='h6'>Formulário de Prato</Typography>
            <Box component="form" sx={{ width: '100%' }} onSubmit={aoSubmeterForm}>
                <TextField
                    label="Nome do Prato"
                    variant="standard"
                    value={nomePrato}
                    onChange={event => setNomePrato(event?.target.value)}
                    fullWidth
                    required
                />
                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    );
}
