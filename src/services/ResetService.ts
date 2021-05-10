import axios from "axios";
import config from '../config';

const url = `${config.apiUrl}/api/reset`;

export const ResetData = async (): Promise<boolean> => {
  await axios.post(url);

  return true;
}