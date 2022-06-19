import * as dotenv from 'dotenv';
import axios, { AxiosRequestConfig } from 'axios';
dotenv.config({ path: '../../.env' });

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

const getAuth0ManagementAccessToken = () => {
  const options: AxiosRequestConfig = {
    method: 'POST',
    url: `${process.env.AUTH0_ISSUER_URL}oauth/token`,
    headers: { 'content-type': 'application/json' },
    data: {
      grant_type: 'client_credentials',
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: `${process.env.AUTH0_ISSUER_URL}api/v2/`,
    },
  };

  return axios
    .request(options)
    .then(function (response) {
      return response.data.access_token;
    })
    .catch(function (error) {
      console.error(error.response.data);
      return [];
    });
};

// Script to set isApproved: false for all users
(async () => {
  const token = await getAuth0ManagementAccessToken();
  console.log('Retrieved token', token);
  const client = axios.create({
    baseURL: `${process.env.AUTH0_ISSUER_URL}api/v2`,
    timeout: 5000,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${token}`,
    },
  });
  const promises = await Promise.all([
    client.get('/users?page=0&per_page=50'),
    client.get('/users?page=1&per_page=50'),
  ]);

  const users = promises.reduce((prev, curr) => {
    return prev.concat(curr.data);
  }, []);

  for (const user of users) {
    console.log('Updating', user.email);
    await client.patch(`/users/${user.user_id}`, {
      app_metadata: {
        isApproved: false,
      },
    });
    await sleep(1000);
  }

  console.log('Done');
})();
