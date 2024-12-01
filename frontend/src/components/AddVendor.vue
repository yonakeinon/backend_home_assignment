<script>
export default {
  data() {
    return {
      name: '',
      location: ''
    };
  },
  methods: {
    async addVendor() {
      const response = await fetch('/vendors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: this.name, location: this.location })
      });
      if (response.ok) {
        alert('Vendor added successfully');
      }
    }
  }
};
</script>