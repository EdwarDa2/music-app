import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common'; 
import { MusicService, Track } from '../../services/music.service';
import { Observable } from 'rxjs'; 

@Component({
  selector: 'app-player',
  standalone: true,
  imports: [CommonModule], 
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.css']
})
export class PlayerComponent implements OnInit {

  public currentTrack$: Observable<Track | null>;
  public isPlaying$: Observable<boolean>;
  public currentTime$: Observable<number>;
  public duration$: Observable<number>;

  constructor(private musicService: MusicService) {
    this.currentTrack$ = this.musicService.currentTrack$;
    this.isPlaying$ = this.musicService.isPlaying$;
    this.currentTime$ = this.musicService.currentTime$;
    this.duration$ = this.musicService.duration$;
  }

  ngOnInit(): void {
    
  }

  onPlayPause(isPlaying: boolean | null): void {
    if (isPlaying) {
      this.musicService.pause();
    } else {
      this.musicService.play(undefined);
    }
  }

  onNext(): void {
    this.musicService.next();
  }

  onPrevious(): void {
    this.musicService.previous();
  }

  onSeek(event: Event): void {
    const input = event.target as HTMLInputElement;
    this.musicService.seek(parseFloat(input.value));
  }

  formatTime(seconds: number | null): string {
    if (seconds === null || isNaN(seconds)) {
      return '0:00';
    }
    const min = Math.floor(seconds / 60);
    const sec = Math.floor(seconds % 60);
    return `${min}:${sec.toString().padStart(2, '0')}`;
  }
}