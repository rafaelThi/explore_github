/* eslint-disable react/jsx-no-target-blank */
import React, { FormEvent, useState, useEffect } from 'react';
import { FiChevronRight } from 'react-icons/fi';

import { Link } from 'react-router-dom';
import api from '../../services/api';

import {
  Title, Form, Repositories, Error,
} from './styles';
import logoImg from '../../assets/Logo.svg';

interface Repository {
  full_name: string;
  description: string;
  owner: {
    login: string;
    avatar_url: string;
  }
}

const Dashboard: React.FunctionComponent = () => {
  const [newRepo, setNewRepo] = useState('');
  const [inputError, setInuputError] = useState('');
  const [repositories, setRepositories] = useState<Repository[]>(() => {
    const storegedRepos = localStorage.getItem('@GithubExplore:repositories');

    if (storegedRepos) {
      return JSON.parse(storegedRepos);
    }
    return [];
  });

  useEffect(() => {
    localStorage.setItem('@GithubExplore:repositories', JSON.stringify(repositories));
  }, [repositories]);

  async function handleRepository(event:FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault();

    if (!newRepo) {
      setInuputError('Digite o autor/nome do repositório');
      return;
    }

    try {
      const response = await api.get<Repository>(`repos/${newRepo}`);

      const repository = response.data;

      setRepositories([repository, ...repositories]);
      setNewRepo('');
      setInuputError('');
    } catch (error) {
      setInuputError('Erro na busca do Repositório');
    }
  }

  return (
    <>
      <img src={logoImg} alt="Git Explorer" />
      <Title>Explore Repositorios no GitHub</Title>

      <Form hasError={!!inputError} onSubmit={handleRepository}>
        <input
          value={newRepo}
          onChange={(e) => setNewRepo(e.target.value)}
          type="text"
          placeholder="Digite o nome do Repositorio"
        />
        <button
          type="submit"
        >
          Pesquisar

        </button>
      </Form>

      {inputError && <Error>{inputError}</Error>}

      <Repositories>
        {repositories.map((repository) => (
          <Link key={repository.full_name} to={`/repository/${repository.full_name}`}>
            <img src={repository.owner.avatar_url} alt={repository.owner.login} />
            <div>
              <strong>{repository.full_name}</strong>
              <p>
                {repository.description}
              </p>
            </div>
            <FiChevronRight size={20} />
          </Link>
        ))}

      </Repositories>
    </>
  );
};
export default Dashboard;
