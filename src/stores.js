import { writable, readable } from 'svelte/store';

export const progress = writable(0);

export const playing = writable(true);

export const cause = writable(null);
export const effect = writable(null);

// export const progress = derived(playing, ($playing, set) => {
//   if ($playing) {
//     const interval = setInterval(() => {
//       console.log("in hereeee");
//     }, 10);  
//   }
//   return () => {
//     clearInterval(interval);
//   };
// }, 0);

export const timerStore = writable(null);