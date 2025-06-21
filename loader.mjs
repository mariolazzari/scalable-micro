export async function loadModule(modulePath) {
  try {
    const module = await import(modulePath);
    return module;
  } catch (error) {
    console.error(`Failed to load module at ${modulePath}:`, error);
    throw error;
  }
}

export async function loadModules(modulePaths) {
  const modules = [];
  for (const path of modulePaths) {
    try {
      const module = await loadModule(path);
      modules.push(module);
    } catch (error) {
      console.error(`Error loading module at ${path}:`, error);
    }
  }
  return modules;
}
