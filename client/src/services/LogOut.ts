import { URL_API_LOGIN } from '../utils/contanst';
import axios from 'axios';

export const LogoutAndDeleteToken = async () => {
  const token = document.cookie;

  try {
    const res = await axios.post(`${URL_API_LOGIN}/logout`, { token });
    if (res.status === 200)
      return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};