import { getRandom } from './get-random';

const playlist: number[] = [];

export function createPlaylist(max: number): number[] {
  if (playlist.length !== max) {
    const song = getRandom(max);
    if (playlist.includes(song)) {
      createPlaylist(max);
    } else {
      playlist.push(song);
      createPlaylist(max);
    }
  }
  return playlist;
}
