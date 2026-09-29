import { useState } from "react";





const useApi = (asyncfunct) =>{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


            const execute = async (...args) =>{
                    setLoading(true);
                    setError(null);

                    try{
                        const user = await asyncfunct(...args)
                        setData(user);

                    }catch(error){
                        const body = error.response?.data;
                        const msg = body?.error || body?.message;
                        setError(Array.isArray(msg) ? msg.map((i) => i.message).join(", ") : msg || error.message);

                    }finally {
                        setLoading(false);
                    }
            }



return {execute ,data, error, loading}    
}



export default useApi