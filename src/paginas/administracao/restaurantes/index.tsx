import { Button, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { Link } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import IRestaurante from '../../../interfaces/IRestaurante';
import http from '../../../http';

export default function AdministracaoRestaurantes() {

  const [restaurantes, setRestaurantes] = useState<IRestaurante[]>([]);

  useEffect(() => {
    http.get<IRestaurante[]>('restaurantes/')
      .then(resposta => setRestaurantes(resposta.data));
  }, []);

  const excluir = (restauranteToBeDeleted: IRestaurante) => {
    http.delete(`restaurantes/${restauranteToBeDeleted.id}/`)
      .then(resposta => {
        alert('Restaurante excluído com sucesso!');

        const novaListaRestaurantes = restaurantes.filter(restaurante => restaurante.id !== restauranteToBeDeleted.id);
        setRestaurantes([ ...novaListaRestaurantes ]);
      })
      .catch(error => {
        console.error('error > ', error);
      });
  };

  return (
    <TableContainer>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>
              Nome
            </TableCell>
            <TableCell>
              Editar
            </TableCell>
            <TableCell>
              Excluir
            </TableCell>
          </TableRow>
        </TableHead>

        <TableBody>
          {restaurantes.map(restaurante => (
            <TableRow key={restaurante.id}>
              <TableCell>
                {restaurante.nome}
              </TableCell>
              <TableCell>
                <Link to={`/admin/restaurantes/${restaurante.id}`}>[ editar ]</Link>
              </TableCell>
              <TableCell>
                <Button variant='outlined' color='error' onClick={() => excluir(restaurante)}>
                  Excluir
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>

      </Table>
    </TableContainer>
  );
}
