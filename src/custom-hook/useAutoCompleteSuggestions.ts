import { useQuery } from 'react-query';
import axios from 'axios';

const fetchAutocompleteSuggestions = async (inputValue: string) => {
    const { data } = await axios.get(`https://652f91320b8d8ddac0b2b62b.mockapi.io/autocomplete`);
    return data;
};

export const useAutocompleteSuggestions = (inputValue: string) => {
    return useQuery(['autocompleteSuggestions', inputValue], () => fetchAutocompleteSuggestions(inputValue), {
        enabled: inputValue.length > 0,
        select: (data) => data.filter((item: any) =>
            ['name', 'category', 'value', 'id'].some(key =>
                String(item[key]).toLowerCase().includes(inputValue.toLowerCase())
            )
        ),
    });
};