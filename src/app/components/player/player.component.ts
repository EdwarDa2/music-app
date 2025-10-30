
import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef } from '@angular/core';
import { createPlaylist } from '../../utils/create-playlist';

interface Song {
  song_name: string;
  artist_name: string;
  song_url: string;
  caratula: string;
}

@Component({
  selector: 'app-player',
   imports: [CommonModule],
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent {
  @ViewChild('audio') audioRef!: ElementRef<HTMLAudioElement>;
  
  songs: Song[] = [
    { song_name: 'Iron Man', artist_name: 'Is a new experience', song_url: 'assets/media/song.mp3', caratula: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600' },
    { song_name: 'Canción CHIDA 2', artist_name: 'Artista 1', song_url: 'assets/media/song_2.mp3', caratula: 'https://picsum.photos/300' },
    { song_name: 'Canción CHIDA 3', artist_name: 'Artista 3', song_url: 'assets/media/song_3.mp3', caratula: 'https://picsum.photos/300' }
  ];

  playlist = createPlaylist(this.songs.length);
  currentIndex = this.playlist.pop() ?? 0;
  currentSong = this.songs[this.currentIndex];
  isPlaying = false;
  progress = 0;
  currentTime = 0;
  totalTime = 0;

  tabs = ['Me gusta', 'Videos', 'Privados', 'Álbum'];
  activeTab = this.tabs[0];

  ngOnInit() {
    this.loadSong();
  }

  togglePlay() {
    const audio = this.audioRef.nativeElement;
    if (this.isPlaying) audio.pause(); else audio.play();
    this.isPlaying = !this.isPlaying;
  }

  updateTime(audio: HTMLAudioElement) {
    this.currentTime = audio.currentTime;
    this.totalTime = audio.duration;
    this.progress = (audio.currentTime / audio.duration) * 100 || 0;
  }

  seek(event: any) {
    const audio = this.audioRef.nativeElement;
    audio.currentTime = (event.target.value / 100) * audio.duration;
  }

  next() {
    if (!this.playlist.length) this.playlist = createPlaylist(this.songs.length);
    this.currentIndex = this.playlist.pop() ?? 0;
    this.loadSong();
  }

  prev() {
    this.currentIndex = (this.currentIndex - 1 + this.songs.length) % this.songs.length;
    this.loadSong();
  }

  loadSong() {
    this.currentSong = this.songs[this.currentIndex];
    const audio = this.audioRef.nativeElement;
    audio.src = this.currentSong.song_url;
    if (this.isPlaying) audio.play();
  }
}
