
export const setToken = (data) =>{
    const token = data.token ;
    localStorage.setItem('token' , token);
    console.log(token);
}
export const getToken = () =>{
    const token = localStorage.getItem('token');
    return token;
}

export const destroyToken =() =>{
    localStorage.removeItem('token');
}
