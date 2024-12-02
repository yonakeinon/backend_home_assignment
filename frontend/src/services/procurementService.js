const baseUrl = 'http://localhost:3002/procurements';

export default {
  async getProcurements() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch procurements');
    }
    return await response.json();
  },
};
