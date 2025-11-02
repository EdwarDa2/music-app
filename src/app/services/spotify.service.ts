import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

// Esta es la respuesta que esperamos de Spotify al pedir un token
interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  // --- Tus llaves (INSEGURAS) ---
  private clientId = environment.spotifyClientId;
  private clientSecret = environment.spotifyClientSecret;

  // --- URLs de Spotify ---
  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private searchUrl = 'https://api.spotify.com/v1/search';

  // --- Lógica para guardar el token ---
  private token$: Observable<string> | null = null;

  constructor(private http: HttpClient) { }

  /**
   * Pide un token a Spotify y lo guarda (cachea) para reusarlo.
   */
  private getAccessToken(): Observable<string> {
    // Si ya tenemos un token pidiéndose o guardado, lo reusamos
    if (this.token$) {
      return this.token$;
    }

    // 1. El 'body' que pide Spotify para el token
    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    // 2. Los 'headers' que pide Spotify
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    // 3. Hacemos la petición POST
    this.token$ = this.http.post<TokenResponse>(this.tokenUrl, body.toString(), { headers })
      .pipe(
        // 4. Extraemos solo el 'access_token' de la respuesta
        switchMap(response => of(response.access_token)),
        // 5. 'shareReplay' guarda el último token y lo comparte con
        //    todas las peticiones que se hagan, hasta que falle.
        shareReplay(1),
        // 6. Si falla, limpiamos el token para pedir uno nuevo
        catchError(err => {
          console.error('Error al obtener token de Spotify', err);
          this.token$ = null; // Limpia el caché para reintentar
          return of(''); // Devuelve un string vacío para que no rompa la app
        })
      );
    
    return this.token$;
  }

  /**
   * La función pública que busca en Spotify.
   * Tu AppComponent llamará a esta.
   */
  public search(query: string): Observable<any> {
    
    // 1. Primero, pídele un token a la función de arriba
    return this.getAccessToken().pipe(
      // 2. 'switchMap' cancela la petición anterior si hay una nueva
      switchMap(token => {
        // Si el token vino vacío (por un error), no hagas nada
        if (!token) {
          return of(null); // Devuelve nulo (o un objeto vacío)
        }

        // 3. Prepara los headers para la búsqueda (con el token)
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        // 4. Prepara los parámetros de la búsqueda
        const params = new HttpParams()
          .set('q', query)
          .set('type', 'track,artist,album')
          .set('limit', '5'); // 5 resultados de cada tipo

        // 5. ¡Hace la búsqueda REAL!
        return this.http.get(this.searchUrl, { headers, params });
      })
    );
  }
}