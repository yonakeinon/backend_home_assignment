const baseUrl = '/api/procurements';

export default {
  async getProcurements() {
    try {
      const response = await fetch(baseUrl);
      if (!response.ok) {
        throw new Error('Failed to fetch procurements');
      }
      return await response.json();
    } catch (error) {
      console.error('Error fetching procurements:', error);
      throw error;
    }
  },

  async addProcurement(procurementData) {
    const response = await fetch(baseUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(procurementData),
    });
    
    if (!response.ok) {
      throw new Error('Failed to add procurement');
    }
    
    return await response.json();
  },
};
