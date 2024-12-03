<template>
  <div class="procurement-list">
    <div class="header">
      <h2>Procurement Requests</h2>
      <button class="add-button" @click="showAddModal = true">
        + Add Procurement
      </button>
    </div>

    <div v-if="loading" class="loading">Loading...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Status</th>
            <th>Vendor</th>
            <th>Created Date</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="procurement in procurements" :key="procurement.id">
            <td>{{ procurement.id }}</td>
            <td>{{ procurement.title }}</td>
            <td>{{ procurement.status }}</td>
            <td>{{ procurement.vendor }}</td>
            <td>{{ new Date(procurement.createdAt).toLocaleDateString() }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- Add Procurement Modal -->
    <div v-if="showAddModal" class="modal">
      <div class="modal-content">
        <h3>Add New Procurement</h3>
        <form @submit.prevent="addProcurement">
          <div class="form-group">
            <label>Title:</label>
            <input v-model="newProcurement.title" required>
          </div>
          <div class="form-group">
            <label>Vendor:</label>
            <select v-model="newProcurement.vendorId" required>
              <option v-for="vendor in vendors" :key="vendor.id" :value="vendor.id">
                {{ vendor.name }}
              </option>
            </select>
          </div>
          <div class="modal-buttons">
            <button type="button" @click="showAddModal = false">Cancel</button>
            <button type="submit">Add Procurement</button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import procurementService from '../services/procurementService';
import vendorService from '../services/vendorService';

export default {
  data() {
    return {
      procurements: [],
      vendors: [],
      loading: true,
      error: null,
      showAddModal: false,
      newProcurement: {
        title: '',
        vendorId: ''
      }
    };
  },
  methods: {
    async loadProcurements() {
      try {
        this.loading = true;
        this.procurements = await procurementService.getProcurements();
      } catch (err) {
        this.error = 'Failed to load procurements: ' + err.message;
      } finally {
        this.loading = false;
      }
    },
    async loadVendors() {
      try {
        this.vendors = await vendorService.getVendors();
      } catch (err) {
        this.error = 'Failed to load vendors: ' + err.message;
      }
    },
    async addProcurement() {
      try {
        await procurementService.addProcurement(this.newProcurement);
        this.showAddModal = false;
        this.resetForm();
        await this.loadProcurements();
      } catch (err) {
        this.error = 'Failed to add procurement: ' + err.message;
      }
    },
    resetForm() {
      this.newProcurement = {
        title: '',
        vendorId: ''
      };
    }
  },
  async mounted() {
    await Promise.all([
      this.loadProcurements(),
      this.loadVendors()
    ]);
  }
};
</script>

<style scoped>
.procurement-list {
  padding: 20px;
}

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

.form-group input,
.form-group select {
  width: 100%;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
}

.error {
  color: red;
  margin: 10px 0;
}

.loading {
  text-align: center;
  padding: 20px;
}
</style>
