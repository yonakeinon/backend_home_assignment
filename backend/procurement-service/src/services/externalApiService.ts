import axios from 'axios';

export const fetchExternalData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data.map((post: any) => ({
            id: post.id,
            title: post.title,
            body: post.body,
        }));
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error in external API call:', error.message);
        }
        throw new Error('Failed to fetch data from external API');
    }
};
