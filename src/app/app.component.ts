import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterOutlet } from '@angular/router'; 
import { SidebarComponent } from './components/sidebar/sidebar.component';


@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet, 
    SidebarComponent
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent { 
  
  constructor(private router: Router) {}

  onSearch(query: string) {
    if (!query) {
      this.router.navigate(['/']); 
    } else {
      this.router.navigate(['/search'], { queryParams: { q: query } });
    }
  }
}