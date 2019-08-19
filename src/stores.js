import { writable, readable } from 'svelte/store';
import causes from "./data/causes";
import effects from "./data/effects";

export const progress = writable(0);

export const playing = writable(true);

export const cause = readable(causes[0]);
export const effect = readable(effects[0]);

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