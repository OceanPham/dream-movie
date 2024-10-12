import React from 'react';
import { useGetALLFilm, useDeleteFilm } from './hook';
import { Table, Button } from 'reactstrap';

const TableFilm = () => {
  const { data, isLoading, error } = useGetALLFilm();
  const deleteMutation = useDeleteFilm();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading films</div>;

  const handleDelete = (id) => {
    deleteMutation.mutate(id);
  };

  return (
    <Table>
      <thead>
        <tr>
          <th>Tên phim</th>
          <th>Hành động</th>
        </tr>
      </thead>
      <tbody>
        {data.map((film) => (
          <tr key={film.id}>
            <td>{film.name}</td>
            <td>
              <Button color="danger" onClick={() => handleDelete(film.id)}>Xóa</Button>
            </td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
};

export default TableFilm;