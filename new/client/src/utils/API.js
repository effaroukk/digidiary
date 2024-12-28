//import axios 
import axios from 'axios';
//create an object user for all CRUD API
const User={
    createMemories:(data)=>axios.post("/data/create",data),
    fetchMemories:(data)=> axios.get("/data/read", { params: { id: data } }),
    updateMemories:(data)=> axios.post("/data/update",data),
    filterMemories:(data)=> axios.get("/data/filter", { params: { date: data } }),
    deleteMemories:(data)=>axios.delete("/data/delete",{ params: { id: data } })
}
//export the user
export default User;
