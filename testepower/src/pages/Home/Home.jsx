import React, { useState, useEffect } from "react";
import restCountries from "./../../services/api";
import { CountryCard } from "../../components/countryCard";
import "./style.css";
import logo from "./../../assets/power2goLogo.png";import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function Home() {
  // Estado para controlar a entrada do usuário na barra de pesquisa
  const [countryBar, setCountryBar] = useState("");
  // Estado para armazenar os países encontrados na pesquisa
  const [countries, setCountries] = useState([]);
  // Estado para armazenar o histórico de pesquisas
  const [searchHistory, setSearchHistory] = useState([]);

  // Efeito para recuperar o histórico de países do localStorage quando o componente montar
  useEffect(() => {
    const storedHistory = localStorage.getItem("searchHistory");
    if (storedHistory) {
      setSearchHistory(JSON.parse(storedHistory));
    }
  }, []);

  function handleApiError(error) {
    console.error('Erro ao buscar países:', error);
    toast.error('Ocorreu um erro ao buscar os países. Por favor, tente novamente.');
  }  

  // Função para buscar um país por nome
  async function buscarPais() {

    


    const data = await restCountries(countryBar);
    console.log(data)
    if (data && data.length > 0) {
      // Atualiza o histórico de pesquisas
      setSearchHistory(prevHistory => [...prevHistory, ...data.map(country => country.name.common)]);
      // Atualiza o localStorage com o novo histórico
      localStorage.setItem(
        "searchHistory",
        JSON.stringify([...searchHistory, ...data.map(country => country.name.common)])
      );
      // Define os países encontrados para exibição
      setCountries(data);
    }else
    {
      toast.error('Pais nao encontrado');
    }
  }

  // Função para buscar um país por nome a partir do histórico de pesquisas
  function handleHistoryItemClick(historyItem) {
    buscarPaisArg(historyItem);
  }

  // Função para buscar um país por nome a partir do histórico de pesquisas
  async function buscarPaisArg(pais) {
    const data = await restCountries(pais);
    if (data && data.length > 0) {
      setSearchHistory(prevHistory => [...prevHistory, ...data.map(country => country.name.common)]);
      localStorage.setItem(
        "searchHistory",
        JSON.stringify([...searchHistory, ...data.map(country => country.name.common)])
      );
      setCountries(data);
    }
  }

  return (
    <div>
      {/* Área de pesquisa */}
      <div className="searchBarArea">
        <img src={logo} alt="Logo" />
        <input
          type="text"
          value={countryBar}
          onChange={e => setCountryBar(e.target.value)}
          placeholder="Ex: Brazil"
        />
        <button onClick={buscarPais} className="Button">Buscar</button>
      </div>
      <ToastContainer />
      {/* Área de resultados */}
      <div className="resultsArea">
        {/* Exibe os cartões de países encontrados */}
        {countries.map((country, index) => (
          <CountryCard
            nome={country.name.common}
            capital={country.capital}
            populacao={country.population}
            moeda={country.currencies[Object.keys(country.currencies)[0]].name}
            idioma={country.languages[Object.keys(country.languages)[0]]}
            bandeira={country.flags.png}
            key={index}
          />
        ))}
        <h2>Histórico de Pesquisas:</h2>
        {/* Lista o histórico de pesquisas */}
        <ul>
          {searchHistory.reverse().map((historyItem, index) => (
            <li key={index}>
              {/* Verifica se o histórico é uma string ou um objeto e renderiza o item apropriado */}
              {typeof historyItem === "string" ? (
                <div>
                  {historyItem}
                  <button onClick={() => handleHistoryItemClick(historyItem)} className="Button historyB">Pesquisar</button>
                </div>
              ) : (
                <div>
                  {historyItem.name.common}
                  <button onClick={() => handleHistoryItemClick(historyItem.name.common)} className="Button historyB">Pesquisar</button>
                </div>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Home;
