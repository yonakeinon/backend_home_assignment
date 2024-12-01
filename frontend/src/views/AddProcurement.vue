<template>
    <form @submit.prevent="addProcurement">
      <h2>Add Procurement Request</h2>
      <input v-model="title" placeholder="Title" />
      <textarea v-model="description" placeholder="Description"></textarea>
      <button type="submit">Add</button>
    </form>
  </template>
  
  <script>
  export default {
    data() {
      return {
        title: '',
        description: ''
      };
    },
    methods: {
      async addProcurement() {
        const response = await fetch('/procurements', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ title: this.title, description: this.description, items: [] })
        });
        if (response.ok) {
          alert('Procurement request added successfully');
        }
      }
    }
  };
  </script>