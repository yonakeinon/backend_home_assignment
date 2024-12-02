const baseUrl = '/api/vendors';

export default {
  async getVendors() {
    const response = await fetch(baseUrl);
    if (!response.ok) {
      throw new Error('Failed to fetch vendors');
    }
    return await response.json();
  },

  async addVendor(vendorData) {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(vendorData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add vendor');
    }
    
    return await response.json();
  },
};
