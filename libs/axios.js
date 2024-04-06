



import axios from 'axios'
import dotenv from 'dotenv';
dotenv.config();

export const getAxios = async(suffixe) => {
  try{
    const datas = await axios.get(
      process.env.MARVEL_URL + suffixe + 'apiKey=' + process.env.MARVEL_KEY
    )
    return datas.data
  }catch(error) {
    if (axios.isAxiosError(error)) { 
      console.log(error.response?.data); 
    } else {
      console.log('Une erreur est survenue', error);
    }
  }
  return null
}

export const postAxios = async(suffixe, body) => { // post simple avec un body de keys/value
  try{
    const datas = await axios.post(
      import.meta.env.VITE_urlVintedReacteur + suffixe, 
      body
    )
    return datas.data
  }catch(error) {
    if (axios.isAxiosError(error)) { 
      console.log(error.response?.data); 
    } else {
      console.log('Une erreur est survenue', error);
    }
  }
  return null
}

