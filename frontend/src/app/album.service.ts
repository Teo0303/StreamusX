import { Injectable } from '@angular/core'
import { Album } from './models/album'
import { HttpClient } from '@angular/common/http'


@Injectable({
  providedIn: 'root'
})

export class AlbumService{
  
  constructor(private http: HttpClient){}

  getAlbums(){
    return this.http.get<Album[]>(`http://localhost:3000/albums`);
  }

  getAlbumSongs(id: number) {
    return this.http.get(`http://localhost:3000/albums/${id}/songs`);
  }

}
