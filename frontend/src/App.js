import React, { useState, useEffect } from 'react';

import api from './services/api';
import './App.css';
import Header from './components/Header';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    })
  }, []); // o array vazio significa que a função vai ser disparada uma vez só, quando o componente for exibido em tela

  async function handleAddProject() {
    // setProjects(
    //   [
    //     ...projects, 
    //     `Novo Projeto ${Date.now()}`
    //   ]) // mudando de forma indireta o valor da variável, aplicando o conceito de imutabilidade

    const response = await api.post('projects', {
      title: `Novo Projeto ${Date.now()}`,
      name: "Luan",
    });

    const project = response.data;

    setProjects([...projects, project])
  }

  return (
    <>
      <Header title="Projects"></Header>

      <ul>
        {projects.map(project => <li key={project.id}>{project.title}</li>)}
      </ul>

      <button type="button" onClick={handleAddProject}>Adicionar Projeto</button>
    </>
  );
}

export default App;