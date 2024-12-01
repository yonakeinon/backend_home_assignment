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
export default {
  props: ['vendors']
};
</script>