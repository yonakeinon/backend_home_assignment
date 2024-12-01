## Getting Started

### Prerequisites

Ensure you have the following installed:
- Docker
- Docker Compose

### Setup

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd sourcix-backend-assignment
   ```

2. Navigate to the `infra` directory:
   ```bash
   cd infra
   ```

3. Start the services:
   ```bash
   docker-compose up --build
   ```

4. Access the services:
   - **Vendor Service**: [http://localhost:3001](http://localhost:3001)
   - **Procurement Service**: [http://localhost:3002](http://localhost:3002)
   - **Frontend UI (Dashboard)**: [http://localhost:8080](http://localhost:8080)

---

## Accessing Services

### Vendor Service

- API Endpoints:
  - GET `/vendors`: Fetch all vendors.
  - POST `/vendors`: Add a new vendor.
- Base URL: [http://localhost:3001](http://localhost:3001)

### Procurement Service

- API Endpoints:
  - GET `/procurements`: Fetch all procurement requests.
  - POST `/procurements`: Add a new procurement request.
- Base URL: [http://localhost:3002](http://localhost:3002)

### Frontend Dashboard

- The Vue.js dashboard provides an interface to interact with the Vendor and Procurement services.
- Access it at [http://localhost:8080](http://localhost:8080).
- Key Features:
  - View all vendors and procurement requests.
  - Add new vendors and procurement requests.

---

## Docker Compose Setup

The `docker-compose.yml` file orchestrates the services and databases.

1. **Vendor Service**:
   - Port: `3001`
   - Depends on `vendor_db`.

2. **Procurement Service**:
   - Port: `3002`
   - Depends on `procurement_db`.

3. **Frontend Dashboard**:
   - Port: `8080`
   - Depends on both backend services.

4. **PostgreSQL Databases**:
   - `vendor_db`: Stores vendor data.
   - `procurement_db`: Stores procurement data.

### To Run Docker Compose:

1. Ensure you are in the `infra` directory:
   ```bash
   cd infra
   ```

2. Start the services:
   ```bash
   docker-compose up --build
   ```

3. To stop the services:
   ```bash
   docker-compose down
   ```

---

## Database Initialization Scripts

### Vendor DB Script

**`infra/db-init/init-vendor-db.sql`**
```sql
CREATE TABLE IF NOT EXISTS vendors (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    location VARCHAR(255) NOT NULL,
    certifications TEXT[],
    rating FLOAT DEFAULT 0
);

INSERT INTO vendors (name, location, certifications, rating) VALUES
('Vendor A', 'New York', '{"ISO9001"}', 4.5),
('Vendor B', 'Los Angeles', '{"ISO14001"}', 4.0);
```

### Procurement DB Script

**`infra/db-init/init-procurement-db.sql`**
```sql
CREATE TABLE IF NOT EXISTS procurements (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    items JSON NOT NULL,
    status VARCHAR(50) DEFAULT 'open',
    createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO procurements (title, description, items, status) VALUES
('Request A', 'Need 100 units of Item X', '[{"itemName":"Item X","quantity":100}]', 'open'),
('Request B', 'Need 50 units of Item Y', '[{"itemName":"Item Y","quantity":50}]', 'in-review');
```

---

## Testing

Run tests for each service to ensure functionality:

1. Navigate to the service directory:
   ```bash
   cd backend/vendor-service
   ```

2. Run tests:
   ```bash
   yarn test
   ```

Repeat for the Procurement Service:

```bash
cd backend/procurement-service
yarn test
```

---