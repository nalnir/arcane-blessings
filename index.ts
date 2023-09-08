import { Charge } from './src/blessings';

// Create a mapping of power names to power classes or functions
const powerRegistry: { [key: string]: any } = {
  charge: Charge,
  // Add more powers as needed
};

// Export the registry
export default powerRegistry;