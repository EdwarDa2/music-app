import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Song {
  id: number;
  caratula: string;
  song_name: string;
  artist_name: string;
  duration: string;
}

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent {
  songs: Song[] = [
    {
      id: 1,
      caratula: 'assets/img/song1.jpg',
      song_name: 'Lost Stars',
      artist_name: 'Adam Levine',
      duration: '3:45'
    },
    {
      id: 2,
      caratula: 'assets/img/song2.jpg',
      song_name: 'Blinding Lights',
      artist_name: 'The Weeknd',
      duration: '3:22'
    },
    {
      id: 3,
      caratula: 'assets/img/song3.jpg',
      song_name: 'Shape of You',
      artist_name: 'Ed Sheeran',
      duration: '4:02'
    }
  ];

  currentIndex: number = 0;

  selectSong(index: number): void {
    this.currentIndex = index;
    console.log('Canción seleccionada:', this.songs[index]);
  }
}
