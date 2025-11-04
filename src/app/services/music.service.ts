import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { createPlaylist } from '../utils/playlist'; 

export interface Track {
  song_name: string;
  artist_name: string;
  song_url: string;
  caratula: string;
}

@Injectable({
  providedIn: 'root'
})
export class MusicService {

  private songs: Track[] = [
    {
      song_name: "cancion CHIDA 1",
      artist_name: "artista 1",
      song_url: "assets/media/song_1.mp3", 
      caratula: "https://picsum.photos/300/300"
    },
    {
      song_name: "cancion CHIDA 2",
      artist_name: "artista 2",
      song_url: "assets/media/song_2.mp3",
      caratula: "https://picsum.photos/300/301"
    },
    {
      song_name: "cancion CHIDA 3",
      artist_name: "artista 3",
      song_url: "assets/media/song_3.mp3",
      caratula: "https://picsum.photos/301/300"
    },
    {
      song_name: "cancion CHIDA 4",
      artist_name: "artista 4",
      song_url: "assets/media/song_4.mp3", 
      caratula: "https://picsum.photos/300/300"
    }
  ];

 
  private playlist: number[] = [];
  private last: number[] = [];
  private playingNow: number = 0; 

 
  public currentTrack$ = new BehaviorSubject<Track | null>(null);
  public isPlaying$ = new BehaviorSubject<boolean>(false);
  public currentTime$ = new BehaviorSubject<number>(0);
  public duration$ = new BehaviorSubject<number>(0);

  private audio = new Audio();

  constructor() {
    
    this.playlist = createPlaylist(this.songs.length);
    this.playingNow = this.playlist.pop()!;
    this.loadTrack(this.playingNow);

    
    this.audio.ontimeupdate = () => {
      this.currentTime$.next(this.audio.currentTime);
    };
    this.audio.onloadedmetadata = () => {
      this.duration$.next(this.audio.duration);
    };
    this.audio.onended = () => {
      this.next(); 
    };
  }

  
  private loadTrack(index: number) {
    const track = this.songs[index];
    this.audio.src = track.song_url;
    this.currentTrack$.next(track);
  }

  
  play(index?: number) {
    if (index !== undefined) {
      this.playlist = createPlaylist(this.songs.length);
      this.last = [];
      this.playingNow = index;
    }
    
    this.loadTrack(this.playingNow);
    this.audio.play();
    this.isPlaying$.next(true);
  }

  pause() {
    this.audio.pause();
    this.isPlaying$.next(false);
  }

  
  next() {
    if (this.playlist.length > 0) {
      this.last.push(this.playingNow);
      this.playingNow = this.playlist.pop()!;
      this.loadTrack(this.playingNow);
      this.play();
    }
  }

  
  previous() {
    if (this.last.length > 0) {
      this.playlist.push(this.playingNow);
      this.playingNow = this.last.pop()!;
      this.loadTrack(this.playingNow);
      this.play();
    }
  }

  seek(value: number) {
    this.audio.currentTime = value;
  }


  getPlaylist(): Track[] {
    return this.songs;
  }
}