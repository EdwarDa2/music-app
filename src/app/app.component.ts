import { Component } from '@angular/core';
import { CommonModule } from '@angular/common'; 


import { SidebarComponent } from './components/sidebar/sidebar.component';
import { PlayerComponent } from './components/player/player.component';
import { PlaylistComponent } from './components/playlist/playlist.component';


import { SpotifyService } from './services/spotify.service'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    SidebarComponent,
    PlayerComponent,
    PlaylistComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 

  public searchResults: any = null;


  constructor(private spotifyService: SpotifyService) {}


  onSearch(query: string) {
    if (!query) {
      this.searchResults = null; 
      return; 
    }
    this.spotifyService.search(query).subscribe(results => {
      console.log(results); 
      this.searchResults = results;
    });
  }
}