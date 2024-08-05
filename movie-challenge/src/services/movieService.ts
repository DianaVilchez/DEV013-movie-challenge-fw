export const getMovieGenres= async():Promise<[{id: number, name: string}]> => {
    const apiKey = import.meta.env.VITE_API_KEY! ;
    const baseUrl =  import.meta.env.VITE_BASE_URL! ;
    
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`,{
        headers:{
            'Authorization': `Bearer ${apiKey}`,
            'Content-Type': 'application/json'
        }
    });
    if(!response.ok){
        throw new Error('Error fetching genres')
    }
    const data =await response.json()
    return data.genres
}