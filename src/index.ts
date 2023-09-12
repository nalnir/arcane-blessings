import { ArcaneAffinity, BloodCurse, Charge } from './blessings';

// Create a mapping of power names to power classes or functions
const powerRegistry: { [key: string]: any } = {
  charge: Charge,
  arcaneAffinity: ArcaneAffinity,
  bloodCurse: BloodCurse
  // Add more powers as needed
};

// Export the registry
export default powerRegistry;