import axios from "axios";

const url = 'http://localhost:5000/api/reset';

export const ResetData = async (): Promise<boolean> => {
  await axios.post(url);

  return true;
}