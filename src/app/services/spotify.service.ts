import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { switchMap, catchError, shareReplay } from 'rxjs/operators';
import { environment } from '../../environments/environment';

interface TokenResponse {
  access_token: string;
  token_type: string;
  expires_in: number;
}

@Injectable({
  providedIn: 'root'
})
export class SpotifyService {

  private clientId = environment.spotifyClientId;
  private clientSecret = environment.spotifyClientSecret;

  private tokenUrl = 'https://accounts.spotify.com/api/token';
  private searchUrl = 'https://api.spotify.com/v1/search';


  private token$: Observable<string> | null = null;

  constructor(private http: HttpClient) { }

  private getAccessToken(): Observable<string> {
    if (this.token$) {
      return this.token$;
    }

    const body = new HttpParams()
      .set('grant_type', 'client_credentials')
      .set('client_id', this.clientId)
      .set('client_secret', this.clientSecret);

    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });

    this.token$ = this.http.post<TokenResponse>(this.tokenUrl, body.toString(), { headers })
      .pipe(
        switchMap(response => of(response.access_token)),
        shareReplay(1),
        catchError(err => {
          console.error('Error al obtener token de Spotify', err);
          this.token$ = null;
          return of('');
        })
      );

    return this.token$;
  }

  public search(query: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        if (!token) {
          return of(null);
        }
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });
        const params = new HttpParams()
          .set('q', query)
          .set('type', 'track,artist,album')
          .set('limit', '5');

        return this.http.get(this.searchUrl, { headers, params });
      })
    );
  }

  public getAlbum(id: string): Observable<any> {
    return this.getAccessToken().pipe(
      switchMap(token => {
        if (!token) {
          return of(null);
        }
        const headers = new HttpHeaders({
          'Authorization': `Bearer ${token}`
        });

        return this.http.get(`https://api.spotify.com/v1/albums/${id}`, { headers });
      })
    );
  }
}