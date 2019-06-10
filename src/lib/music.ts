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
    colors: [[170, 13, 37], [15, 22, 45]], // rgb(170, 13, 37) rgb(15, 22, 45)
  },
  2: {
    name: 'C♯/D♭',
    colors: [[59, 175, 74], [0, 0, 81]], // rgb(59, 175, 74) rgb(0, 0, 81)
  },
  3: {
    name: 'D',
    colors: [[181, 138, 45], [48, 14, 9]], // rgb(181, 138, 45) rgb(48, 14, 9)
  },
  4: {
    name: 'D♯/E♭',
    colors: [[188, 52, 100], [17, 36, 94]], // rgb(188, 52, 100) rgb(17, 36, 94)
  },
  5: {
    name: 'E',
    colors: [[42, 84, 191], [20, 23, 30]], // rgb(42, 84, 191) rgb(20, 23, 30)
  },
  6: {
    name: 'F',
    colors: [[186, 9, 32], [0, 0, 0]], // rgb(186, 9, 32) rgb(0,0,0)
  },
  7: {
    name: 'F♯/G♭',
    colors: [[113, 142, 102], [66, 23, 59]], // rgb(113, 142, 102) rgb(41, 9, 0)
  },
  8: {
    name: 'G',
    colors: [[191, 0, 127], [23, 31, 81]], // rgb(191, 0, 127) rgb(23, 31, 81)
  },
  9: {
    name: 'G♯/A♭',
    colors: [[163, 101, 116], [23, 58, 71]], // rgb(163, 101, 116) rgb(23, 58, 71)
  },
  10: {
    name: 'A',
    colors: [[122, 122, 51], [37, 12, 37]], // rgb(122, 122, 51) rgb(37, 12, 37)
  },
  11: {
    name: 'A♯/B♭',
    colors: [[24, 105, 150], [56, 15, 15]], // rgb(24, 105, 150) rgb(56, 15, 15)
  },
  12: {
    name: 'B',
    colors: [[140, 79, 39], [29, 29, 52]], // rgb(140, 79, 39) rgb(29, 29, 52)
  },
};

export const hasHigherThanAverageDanceability = (val: number) => val > 0.55;

export const hasHigherThanAverageEnergy = (val: number) => val > 0.65;

export const hasHigherThanAverageTempo = (val: number) => val > 115;
