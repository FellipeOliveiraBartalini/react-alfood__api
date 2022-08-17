import React, { useEffect, useState } from 'react';
import { Box, Button, FormControl, InputLabel, MenuItem, Select, TextField, Typography } from '@mui/material';
import { useParams, Link as RouterLink } from 'react-router-dom';
import http from '../../../http';
import IPrato from '../../../interfaces/IPrato';
import ITag from '../../../interfaces/ITag';
import IRestaurante from '../../../interfaces/IRestaurante';

export default function FormularioPrato() {
    const parametros = useParams();

    const [nomePrato, setNomePrato] = useState('');
    const [descricao, setDescricao] = useState('');

    const [tag, setTag] = useState('');
    const [tags, setTags] = useState<ITag[]>([]);
    
    const [restaurante, setRestaurante] = useState('');
    const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

    const [imagem, setImagem] = useState<File | null>(null);

    useEffect(() => {
        http.get<{ tags: ITag[] }>('tags/')
            .then(resposta => setTags(resposta.data.tags));
        http.get<IRestaurante[]>('restaurantes/')
            .then(resposta => setRestaurantes(resposta.data));
    }, []);

    const selecionaArquivo = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files?.length) {
            setImagem(event.target.files[0]);
        } else {
            setImagem(null);
        }
    };

    const aoSubmeterForm = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const formData = new FormData;

        formData.append('nome', nomePrato);
        formData.append('descricao', descricao);

        formData.append('tag', tag);

        formData.append('restaurante', restaurante);

        if (imagem) {
            formData.append('imagem', imagem);
        }

        http.request({
            url: 'pratos/',
            method: 'POST',
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            data: formData
        })
            .then(() => {
                setNomePrato('')
                setDescricao('')
                setTag('')
                setRestaurante('')
                alert('Prato cadastrado com sucesso!')
            })
            .catch(error => console.error(error));
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
                    margin='dense'
                    required
                />

                <TextField
                    label="Descrição do Prato"
                    variant="standard"
                    value={descricao}
                    onChange={event => setDescricao(event?.target.value)}
                    fullWidth
                    margin='dense'
                    required
                />
                
                <FormControl margin='dense' fullWidth>
                    <InputLabel id='select-tag'>Tag</InputLabel>
                    <Select labelId='select-tag' value={tag} onChange={event => setTag(event.target.value)}>
                        {tags.map(tag => (
                            <MenuItem value={tag.value} key={tag.id}>
                                {tag.value}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <FormControl margin='dense' fullWidth>
                    <InputLabel id='select-restaurante'>Restaurante</InputLabel>
                    <Select labelId='select-restaurante' value={restaurante} onChange={event => setRestaurante(event.target.value)}>
                        {restaurantes.map(restaurante => (
                            <MenuItem value={restaurante.id} key={restaurante.id}>
                                {restaurante.nome}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <input type="file" onChange={event => selecionaArquivo(event)}/>

                <Button sx={{ marginTop: 1 }} type='submit' variant="outlined" fullWidth>Salvar</Button>
            </Box>
        </Box>
    );
}
