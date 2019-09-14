export const pick = obj => {  
  const entries = Object.entries(obj);
  const rng = Math.floor(Math.random() * entries.length);
  return entries[rng];
};
