import { useState, useEffect } from "react";

/**
 * Custom hook to dynamically import Syncfusion components
 * @param importFn - Function that returns a promise with the Syncfusion package
 * @param componentNames - Array of component names to extract from the package
 * @returns Object with loaded components or null if not yet loaded
 * 
 * @example
 * const components = useSyncfusionComponent(
 *   () => import("@syncfusion/ej2-react-buttons"),
 *   ["ButtonComponent"]
 * );
 * if (!components) return null;
 * const { ButtonComponent } = components;
 */
export function useSyncfusionComponent<T extends Record<string, any>>(
  importFn: () => Promise<T>,
  componentNames: (keyof T)[]
): Record<string, any> | null {
  const [components, setComponents] = useState<Record<string, any> | null>(null);

  useEffect(() => {
    importFn().then((pkg) => {
      const loadedComponents: Record<string, any> = {};
      componentNames.forEach((name) => {
        loadedComponents[name as string] = pkg[name];
      });
      setComponents(loadedComponents);
    });
  }, []);

  return components;
}
