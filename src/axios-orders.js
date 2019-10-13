import axios from 'axios';

const instance=axios.create({
    baseURL:'https://react-my-burger-759e5.firebaseio.com/'
});
export default instance;