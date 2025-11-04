function getRandom(max: number): number {
  return Math.floor(Math.random() * max);
}

export function createPlaylist(max: number): number[] {
  const playlist: number[] = [];
  
  function build(max: number) {
    if (playlist.length !== max) {
      const song = getRandom(max);
      if (!playlist.includes(song)) {
        playlist.push(song);
      }
      build(max);
    }
  }
  
  build(max);
  return playlist;
}