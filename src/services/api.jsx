import axios from 'axios';

const apiRestCountries = axios.create({
  baseURL: "https://restcountries.com/v3.1/name/"
});

export default async function restCountries(countryName){
    try {
        const  countryInfos = await apiRestCountries.get('/' + countryName);
        // console.log(countryInfos);
        return countryInfos.data
    } catch (error) {
        console.log(error)
    }
}