<template>
    <div>
      <h2>Procurement Requests</h2>
      <ul>
        <li v-for="procurement in procurements" :key="procurement.id">
          {{ procurement.title }} - {{ procurement.status }}
        </li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    props: ['procurements']
  };
  </script>