<template>
    <div id="app">
      <header>
        <h1>Sourcix Dashboard</h1>
        <nav>
          <button @click="view = 'vendors'">Vendors</button>
          <button @click="view = 'procurements'">Procurements</button>
        </nav>
      </header>
      <main>
        <VendorList v-if="view === 'vendors'" />
        <ProcurementList v-if="view === 'procurements'" />
      </main>
    </div>
  </template>
  
  <script>
  import VendorList from './components/VendorList.vue';
  import ProcurementList from './components/ProcurementList.vue';
  
  export default {
    components: {
      VendorList,
      ProcurementList,
    },
    data() {
      return {
        view: 'vendors', // Default view
      };
    },
  };
  </script>
  
  <style>
  /* Add your styles here */
  </style>
  