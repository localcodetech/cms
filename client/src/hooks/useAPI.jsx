import { useState } from "react";





const useApi = (asyncfunct) =>{

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null)


            const execute = async (...args) =>{
                    setLoading(true);

                    try{
                        const user = await asyncfunct(...args)
                        setData(user);

                    }catch(error){
                        setError(error.response?.data?.error || error.message);

                    }finally {
                        setLoading(false);
                    }
            }



return {execute ,data, error, loading}    
}



export default useApi