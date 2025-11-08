import { Component } from '@angular/core';
import { PlayerComponent } from '../player/player.component';
import { PlaylistComponent } from '../playlist/playlist.component';

@Component({
  selector: 'app-home',
  standalone: true,

  imports: [PlayerComponent, PlaylistComponent],
 
  template: `
    <div class="content-area">
      <app-player></app-player>
      <app-playlist></app-playlist>
    </div>
  `,

  styles: [`
    .content-area {
      flex: 1;
      padding: 32px;
      display: grid;
      grid-template-columns: 1fr 300px;
      gap: 32px;
      overflow-y: auto;
    }
    @media (max-width: 1024px) {
      .content-area {
        grid-template-columns: 1fr;
        gap: 24px;
      }
    }
  `]
})
export class HomeComponent { }