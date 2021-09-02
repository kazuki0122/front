import axios from 'axios';

export const fetchUsers = () => {
  axios
    .get('http://localhost:3001/api/v1/users')
    .then((res) => {
      console.log(res.data.data);
    })
    .catch((err) => {
      console.log(err);
    });
};