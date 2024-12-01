<template>
    <div>
      <h1>Dashboard</h1>
      <VendorList :vendors="vendors" />
      <ProcurementList :procurements="procurements" />
    </div>
  </template>
  
  <script>
  import VendorList from '../components/VendorList.vue';
  import ProcurementList from '../components/ProcurementList.vue';
  
  export default {
    components: { VendorList, ProcurementList },
    data() {
      return {
        vendors: [],
        procurements: []
      };
    },
    async created() {
      this.vendors = await fetch('/vendors').then(res => res.json());
      this.procurements = await fetch('/procurements').then(res => res.json());
    }
  };
  </script>