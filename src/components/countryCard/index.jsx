import React from "react";
import { CountryCardWrapper } from "./styles/CountryCardWrapper";

export function CountryCard({ nome, capital, populacao, moeda, idioma, bandeira}) {
  return (
    <CountryCardWrapper>
      <img src={bandeira}/>
      <div className="countryInfos">
        <p>Pais: {nome}</p>
        <p>Capital: {capital}</p>
        <p>Populacao: {populacao}</p>
        <p>Moeda: {moeda}</p>
        <p>Idioma: {idioma}</p>
      </div>
    </CountryCardWrapper>
  );
}