import { Pool } from 'pg';

const connectionString = 'postgresql://admin:admin@localhost:5432/users_application';

const db = new Pool({ connectionString });

export default db;