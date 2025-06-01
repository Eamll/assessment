# Recipe Backend API

A flexible backend API that supports both JSON file storage and database storage using TypeORM.

## Architecture

The backend uses the **Repository Pattern** and **Strategy Pattern** to provide a clean abstraction between the API endpoints and data storage, making it easy to switch between different data sources.

### Design Patterns Used

- **Repository Pattern**: Abstracts data access logic
- **Strategy Pattern**: Allows switching between different data storage implementations
- **Factory Pattern**: Creates appropriate repository instances based on configuration


### Data Source Options

#### 1. JSON File Storage (Default)
```bash
DATA_SOURCE=json
JSON_DB_PATH=./db.json
```

#### 2. SQLite Database
```bash
DATA_SOURCE=typeorm
DB_TYPE=sqlite
DB_DATABASE=database.sqlite
```

## Usage

### Development
```bash
# Install dependencies
npm install

# Use JSON storage (default)
npm run dev


# Seed database (TypeORM only)
npm run seed
```

### Production
```bash
# Build the application
npm run build

# Start production server
npm start
```