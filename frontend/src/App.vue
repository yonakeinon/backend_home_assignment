<template>
    <div id="app">
      <header>
        <h1>Sourcix Dashboard</h1>
        <nav>
          <button @click="view = 'vendors'" :class="{ active: view === 'vendors' }">Vendors</button>
          <button @click="view = 'procurements'" :class="{ active: view === 'procurements' }">Procurements</button>
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
        view: 'vendors',
      };
    },
  };
  </script>
  
  <style>
  #app {
    font-family: Arial, sans-serif;
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
  }

  header {
    margin-bottom: 20px;
  }

  h1 {
    color: #333;
    margin-bottom: 20px;
  }

  nav {
    margin-bottom: 20px;
  }

  button {
    padding: 10px 20px;
    margin-right: 10px;
    border: none;
    border-radius: 4px;
    background-color: #f0f0f0;
    cursor: pointer;
    transition: background-color 0.3s;
  }

  button.active {
    background-color: #007bff;
    color: white;
  }

  button:hover {
    background-color: #007bff;
    color: white;
  }

  main {
    background-color: white;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  }
  </style>
  