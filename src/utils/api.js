import axios from "axios";
import { SPORTMONKS_TOKEN } from "@env";

const BASE_URL = "https://api.sportmonks.com/v3/football";

const token = SPORTMONKS_TOKEN;

export default function api(endpoint, data = null) {
    const url = `${BASE_URL}/${endpoint}`;

    return axios({
      method : "GET",
      url,
      data,
      headers: {
        Authorization : token
      },
      withCredentials: true,
    })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      throw error;
    });
}
