import { fileURLToPath } from 'url';
import path from 'path';
import fs from 'fs';
import { Sequelize } from 'sequelize';
import process from 'process';
import configFile from '../config/config.js';  // Import JS config

// Convert __dirname and __filename to work in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = configFile[env];
const db = {};

// Initialize Sequelize instance
let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

// Read model files and dynamically import them
const modelFiles = fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  });

// Loop through models and dynamically import
for (const file of modelFiles) {
  const modelPath = path.join(__dirname, file);
  const { default: model } = await import(`file://${modelPath}`);  // Convert to file URL
  const modelInstance = model(sequelize, Sequelize.DataTypes);
  db[modelInstance.name] = modelInstance;
}

// Set up associations
Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Add User model
import userModel from './User.js';  // Import user model
db.User = userModel(sequelize, Sequelize);

export default db;
