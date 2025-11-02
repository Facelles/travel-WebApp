import { registerLicense } from "@syncfusion/ej2-base";

/**
 * Initializes Syncfusion license
 * Should be called once at application startup
 */
let isLicenseRegistered = false;

export function initializeSyncfusionLicense(): void {
  if (!isLicenseRegistered) {
    registerLicense(import.meta.env.VITE_SYNCFUSION_LICENSE_KEY);
    isLicenseRegistered = true;
  }
}
