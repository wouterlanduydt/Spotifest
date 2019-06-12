// https://developer.spotify.com/documentation/web-api/reference/tracks/get-audio-features/

export const hasHigherThanAverageDanceability = (val: number) => val > 0.55;

export const hasHigherThanAverageEnergy = (val: number) => val > 0.65;

export const hasHigherThanAverageTempo = (val: number) => val > 115;
