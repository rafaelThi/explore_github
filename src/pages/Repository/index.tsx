/* eslint-disable react/jsx-no-target-blank */
import React, { useEffect, useState } from 'react';
import { Link, useRouteMatch } from 'react-router-dom';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

import { Header, RepositoryInfo, Issues } from './styles';
import logoImg from '../../assets/Logo.svg';
import api from '../../services/api';

interface RepositoryParms {
  repository:string;
}

interface Repository {
  full_name: string;
  description: string;
  stargazers_count: number;
  forks_count:number;
  open_issues_count:number;
  owner: {
    login: string;
    avatar_url: string;
  }
}

interface Issue {
  title:string;
  id:number;
  html_url:string;
  user:{
    login:string;
  }
}

const Repository: React.FunctionComponent = () => {
  const [repository, setRepository] = useState<Repository | null >(null);
  const [issues, setIssues] = useState<Issue[]>([]);

  const { params } = useRouteMatch<RepositoryParms>();

  useEffect(() => {
    api.get(`/repos/${params.repository}`).then((response) => {
      setRepository(response.data);
    });
    api.get(`/repos/${params.repository}/issues`).then((response) => {
      setIssues(response.data);
    });
  }, [params.repository]);//eslint-disable-line

  return (
    <>
      <Header>
        <img src={logoImg} alt="Logo" />
        <Link to="/">
          <FiChevronLeft size={16} />
          Voltar
        </Link>
      </Header>
      {repository && (

      <RepositoryInfo>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <div>
            <strong>{repository.full_name}</strong>
            <p>{repository.description}</p>
          </div>
        </header>
        <ul>
          <li>
            <strong>
              {repository.stargazers_count}
            </strong>
            <span>Stars</span>
          </li>
          <li>
            <strong>
              {repository.forks_count}
            </strong>
            <span>Forks</span>
          </li>
          <li>
            <strong>
              {repository.open_issues_count}
            </strong>
            <span>Inssues Abertas</span>
          </li>
        </ul>
      </RepositoryInfo>

      )}

      <Issues>
        {issues.map((issue) => (
          <a target="_blank" key={issue.id} href={issue.html_url}>
            <div>
              <strong>{issue.title}</strong>
              <p>
                {issue.user.login}
              </p>
            </div>
            <FiChevronRight size={20} />
          </a>
        ))}
      </Issues>

    </>
  );
};

export default Repository;
