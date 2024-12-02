<template>
  <div>
    <h2>Vendors</h2>
    <ul>
      <li v-for="vendor in vendors" :key="vendor.id">
        {{ vendor.name }} - {{ vendor.location }}
      </li>
    </ul>
  </div>
</template>

<script>
import vendorService from '../services/vendorService';

export default {
  data() {
    return {
      vendors: [],
    };
  },
  mounted() {
    vendorService.getVendors().then((data) => {
      this.vendors = data;
    });
  },
};
</script>
