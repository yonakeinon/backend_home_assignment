const baseUrl = 'http://localhost:3001/vendors';

export default {
  async getVendors() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch vendors');
    }
    return await response.json();
  },
};
