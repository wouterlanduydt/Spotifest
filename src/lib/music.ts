// https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/

export type TKeys = {
  [number: number]: {
    name: string;
    colors: number[][];
  };
};

export const keys: TKeys = {
  1: {
    name: 'C',
    // rgb(170, 13, 37) rgb(15, 22, 45)
    colors: [[170, 13, 37], [15, 22, 45]],
  },
  2: {
    name: 'C♯/D♭',
    // rgb(59, 175, 74) rgb(0, 0, 81)
    colors: [[59, 175, 74], [0, 0, 81]],
  },
  3: {
    name: 'D',
    // rgb(181, 138, 45) rgb(48, 14, 9)
    colors: [[181, 138, 45], [48, 14, 9]],
  },
  4: {
    name: 'D♯/E♭',
    // rgb(188, 52, 100) rgb(17, 36, 94)
    colors: [[188, 52, 100], [17, 36, 94]],
  },
  5: {
    name: 'E',
    // rgb(42, 84, 191) rgb(20, 23, 30)
    colors: [[42, 84, 191], [20, 23, 30]],
  },
  6: {
    name: 'F',
    // rgb(186, 9, 32) rgb(0,0,0)
    colors: [[186, 9, 32], [0, 0, 0]],
  },
  7: {
    name: 'F♯/G♭',
    // rgb(113, 142, 102) rgb(41, 9, 0)
    colors: [[113, 142, 102], [66, 23, 59]],
  },
  8: {
    name: 'G',
    // rgb(191, 0, 127) rgb(23, 31, 81)
    colors: [[191, 0, 127], [23, 31, 81]],
  },
  9: {
    name: 'G♯/A♭',
    // rgb(163, 101, 116) rgb(23, 58, 71)
    colors: [[163, 101, 116], [23, 58, 71]],
  },
  10: {
    name: 'A',
    // rgb(122, 122, 51) rgb(37, 12, 37)
    colors: [[122, 122, 51], [37, 12, 37]],
  },
  11: {
    name: 'A♯/B♭',
    // rgb(24, 105, 150) rgb(56, 15, 15)
    colors: [[24, 105, 150], [56, 15, 15]],
  },
  12: {
    name: 'B',
    // rgb(140, 79, 39) rgb(29, 29, 52)
    colors: [[140, 79, 39], [29, 29, 52]],
  },
};

export const hasHigherThanAverageDanceability = (val: number) => val > 0.6;

export const hasHigherThanAverageEnergy = (val: number) => val > 0.65;

export const hasHigherThanAverageTempo = (val: number) => val > 115;
