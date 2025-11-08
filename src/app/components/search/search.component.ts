// src/app/components/search/search.component.ts
import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-search',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css']
})
export class SearchComponent implements OnInit {

  public searchResults: any = null;
  @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

  constructor(
    private route: ActivatedRoute,
    private spotifyService: SpotifyService
  ) { }

  ngOnInit(): void {
    this.route.queryParams
      .pipe(
        switchMap(params => {
          const query = params['q'];
          return this.spotifyService.search(query);
        })
      )
      .subscribe(results => {

        this.searchResults = results;
      });
  }

  playPreview(track: any) {
    const audioEl = this.audioPlayer.nativeElement;
    if (track.preview_url) {
      if (audioEl.src === track.preview_url) {
        audioEl.paused ? audioEl.play() : audioEl.pause();
      } else {
        audioEl.src = track.preview_url;
        audioEl.play();
      }
    } else {
      console.log('Esta canción no tiene preview :(');
    }
  }
}