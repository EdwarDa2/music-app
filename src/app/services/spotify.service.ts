// src/app/services/spotify.service.ts
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  constructor() { }

  public search(query: string): Observable<any> {
    
    console.log(`(FALSO) Buscando: "${query}"`);

    // --- JSON FALSO PERO AHORA CON IMÁGENES ---
    // Esta estructura imita la respuesta real de la API de Spotify
    const mockResults = {
      
      // --- ARTISTAS ---
      artists: {
        items: [
          { 
            name: 'Bad Bunny (Mock)', 
            type: 'artist',
            // Spotify devuelve un array de imágenes, tomamos la primera
            images: [{ url: 'https://picsum.photos/seed/bunny/300' }] 
          },
          { name: 'Dua Lipa (Mock)', type: 'artist', images: [{ url: 'https://picsum.photos/seed/dualipa/300' }] },
          { name: 'Metallica (Mock)', type: 'artist', images: [{ url: 'https://picsum.photos/seed/metallica/300' }] },
          { name: 'The Weeknd (Mock)', type: 'artist', images: [{ url: 'https://picsum.photos/seed/weeknd/300' }] },
          { name: 'Peso Pluma (Mock)', type: 'artist', images: [{ url: 'https://picsum.photos/seed/ppluma/300' }] }
        ]
      },
      
      // --- ÁLBUMES ---
      albums: {
        items: [
          { 
            name: 'Un Verano Sin Ti', 
            artists: [{ name: 'Bad Bunny' }], 
            images: [{ url: 'https://picsum.photos/seed/verano/300' }] 
          },
          { 
            name: 'Future Nostalgia', 
            artists: [{ name: 'Dua Lipa' }], 
            images: [{ url: 'https://picsum.photos/seed/future/300' }] 
          },
          { 
            name: 'Master of Puppets', 
            artists: [{ name: 'Metallica' }], 
            images: [{ url: 'https://picsum.photos/seed/puppets/300' }] 
          },
          { 
            name: 'Dawn FM', 
            artists: [{ name: 'The Weeknd' }], 
            images: [{ url: 'https://picsum.photos/seed/dawn/300' }] 
          },
          { 
            name: 'GÉNESIS', 
            artists: [{ name: 'Peso Pluma' }], 
            images: [{ url: 'https://picsum.photos/seed/genesis/300' }] 
          }
        ]
      },
      
      // --- CANCIONES ---
      tracks: {
        items: [
          { 
            name: 'Me Porto Bonito', 
            artists: [{ name: 'Bad Bunny' }], 
            // En las canciones, la imagen viene DENTRO del objeto 'album'
            album: { images: [{ url: 'https://picsum.photos/seed/meporto/300' }] } 
          },
          { 
            name: 'Levitating', 
            artists: [{ name: 'Dua Lipa' }], 
            album: { images: [{ url: 'https://picsum.photos/seed/levitating/300' }] } 
          },
          { 
            name: 'Enter Sandman', 
            artists: [{ name: 'Metallica' }], 
            album: { images: [{ url: 'https://picsum.photos/seed/sandman/300' }] } 
          },
          { 
            name: 'Blinding Lights', 
            artists: [{ name: 'The Weeknd' }], 
            album: { images: [{ url: 'https://picsum.photos/seed/blinding/300' }] } 
          },
          { 
            name: 'LADY GAGA', 
            artists: [{ name: 'Peso Pluma' }], 
            album: { images: [{ url: 'https://picsum.photos/seed/ladygaga/300' }] } 
          }
        ]
      }
    };
    
    // Devolvemos el JSON falso como un Observable
    return of(mockResults);
  }
}