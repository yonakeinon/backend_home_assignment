import axios from 'axios';

export const fetchExternalProcurementData = async () => {
    try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/posts');
        return response.data.slice(0, 5);
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error('Error fetching procurement data:', error.message);
        }
        throw new Error('Failed to fetch procurement data from external API');
    }
};

export const createProcurementsForVendor = async (vendorId: string, externalData: any[]) => {
    try {
        const procurements = externalData.map((data, index) => ({
            title: data.title || `Procurement ${index + 1}`,
            items: [
                { itemName: 'Item A', quantity: Math.floor(Math.random() * 10) + 1 },
                { itemName: 'Item B', quantity: Math.floor(Math.random() * 20) + 1 },
            ],
            vendorId,
        }));

        console.log(`Created procurements for vendor ${vendorId}:`, procurements);

        return procurements;
    } catch (error: unknown) {
        if (error instanceof Error) {
            console.error(`Error creating procurements for vendor ${vendorId}:`, error.message);
        }
        throw new Error('Failed to create procurements for the vendor');
    }
};
