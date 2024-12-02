<template>
  <div class="vendor-list">
    <h2>Vendors</h2>
    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Location</th>
            <th>Certifications</th>
            <th>Rating</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="vendor in vendors" :key="vendor.id">
            <td>{{ vendor.id }}</td>
            <td>{{ vendor.name }}</td>
            <td>{{ vendor.location }}</td>
            <td>{{ vendor.certifications?.join(', ') }}</td>
            <td>{{ vendor.rating }}/5</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import vendorService from '../services/vendorService';

export default {
  data() {
    return {
      vendors: [],
      loading: true,
      error: null
    };
  },
  async mounted() {
    try {
      this.loading = true;
      this.vendors = await vendorService.getVendors();
    } catch (err) {
      this.error = 'Failed to load vendors: ' + err.message;
    } finally {
      this.loading = false;
    }
  }
};
</script>

<style scoped>
.vendor-list {
  padding: 20px;
}

.loading {
  text-align: center;
  color: #666;
  padding: 20px;
}

.error {
  color: #dc3545;
  padding: 20px;
  text-align: center;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  border: 1px solid #ddd;
  padding: 12px;
  text-align: left;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

tr:nth-child(even) {
  background-color: #f9f9f9;
}

tr:hover {
  background-color: #f5f5f5;
}

td:nth-child(5) {
  text-align: center;
}
</style>
