<template>
  <div class="vendor-list">
    <div class="header">
      <h2>Vendors</h2>
      <button class="add-button" @click="showAddVendorModal = true">
        + Add Vendor
      </button>
    </div>
    
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

    <!-- Add Vendor Modal -->
    <div v-if="showAddVendorModal" class="modal">
      <div class="modal-content">
        <h3>Add New Vendor</h3>
        <form @submit.prevent="addVendor">
          <div class="form-group">
            <label>Name:</label>
            <input v-model="newVendor.name" required>
          </div>
          <div class="form-group">
            <label>Location:</label>
            <input v-model="newVendor.location" required>
          </div>
          <div class="form-group">
            <label>Certifications (comma-separated):</label>
            <input v-model="newVendor.certificationsInput">
          </div>
          <div class="form-group">
            <label>Rating:</label>
            <input type="number" v-model="newVendor.rating" min="0" max="5" step="0.1">
          </div>
          <div class="modal-buttons">
            <button type="button" @click="showAddVendorModal = false">Cancel</button>
            <button type="submit">Add Vendor</button>
          </div>
        </form>
      </div>
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
      error: null,
      showAddVendorModal: false,
      newVendor: {
        name: '',
        location: '',
        certificationsInput: '',
        rating: 0
      }
    };
  },
  methods: {
    async addVendor() {
      try {
        const vendorData = {
          name: this.newVendor.name,
          location: this.newVendor.location,
          certifications: this.newVendor.certificationsInput.split(',').map(cert => cert.trim()),
          rating: parseFloat(this.newVendor.rating)
        };
        
        await vendorService.addVendor(vendorData);
        this.showAddVendorModal = false;
        this.resetForm();
        await this.loadVendors();
      } catch (err) {
        this.error = 'Failed to add vendor: ' + err.message;
      }
    },
    resetForm() {
      this.newVendor = {
        name: '',
        location: '',
        certificationsInput: '',
        rating: 0
      };
    },
    async loadVendors() {
      try {
        this.loading = true;
        this.vendors = await vendorService.getVendors();
      } catch (err) {
        this.error = 'Failed to load vendors: ' + err.message;
      } finally {
        this.loading = false;
      }
    }
  },
  async mounted() {
    await this.loadVendors();
  }
};
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
}

.add-button {
  background-color: #007bff;
  color: white;
  border: none;
  padding: 10px 20px;
  border-radius: 4px;
  cursor: pointer;
}

.add-button:hover {
  background-color: #0056b3;
}

.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  width: 400px;
}

.form-group {
  margin-bottom: 15px;
}

.form-group label {
  display: block;
  margin-bottom: 5px;
}

.form-group input {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.modal-buttons {
  display: flex;
  justify-content: flex-end;
  gap: 10px;
  margin-top: 20px;
}

.modal-buttons button {
  padding: 8px 16px;
  border-radius: 4px;
  cursor: pointer;
}

.modal-buttons button[type="submit"] {
  background-color: #28a745;
  color: white;
  border: none;
}

.modal-buttons button[type="button"] {
  background-color: #6c757d;
  color: white;
  border: none;
}

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
