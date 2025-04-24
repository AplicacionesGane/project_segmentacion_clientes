import { URL_API_LOGIN } from '../utils/contanst';
import axios from 'axios';

export const LogoutAndDeleteToken = async () => {
  try {
    const res = await axios.get(`${URL_API_LOGIN}/logout`);
    if (res.status === 200)
      return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};