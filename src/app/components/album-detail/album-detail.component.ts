import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { SpotifyService } from '../../services/spotify.service';
import { Observable, of } from 'rxjs';
import { switchMap } from 'rxjs';

@Component({
    selector: 'app-album-detail',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './album-detail.component.html',
    styleUrls: ['./album-detail.component.css']
})
export class AlbumDetailComponent implements OnInit {

    album$: Observable<any>;

    @ViewChild('audioPlayer') audioPlayer!: ElementRef<HTMLAudioElement>;

    constructor(
        private route: ActivatedRoute,
        private spotifyService: SpotifyService
    ) {
        this.album$ = this.route.paramMap.pipe(
            switchMap((params: ParamMap) => {
                const id = params.get('id');
                if (id) {
                    return this.spotifyService.getAlbum(id);
                }
                return of(null);
            })
        );
    }

    ngOnInit(): void {
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

    formatDuration(ms: number): string {
        const minutes = Math.floor(ms / 60000);
        const seconds = Number(((ms % 60000) / 1000).toFixed(0));
        return `${minutes}:${(seconds < 10 ? '0' : '')}${seconds}`;
    }
}