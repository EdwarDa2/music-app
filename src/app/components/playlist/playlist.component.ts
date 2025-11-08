import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MusicService, Track } from '../../services/music.service';

@Component({
  selector: 'app-playlist',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './playlist.component.html',
  styleUrls: ['./playlist.component.css']
})
export class PlaylistComponent implements OnInit {

  public playlist: Track[] = [];
  public currentTrack: Track | null = null;

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.playlist = this.musicService.getPlaylist();
    
    this.musicService.currentTrack$.subscribe(track => {
      this.currentTrack = track;
    });
  }
  playTrack(index: number): void {
    this.musicService.play(index);
  }
}