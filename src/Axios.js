import axios from "axios"

const instance=axios.create({
    baseURL:"http://localhost:5001/react-clone-2d391/us-central1/api"

})

export default instance;