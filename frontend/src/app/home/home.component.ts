import { Component, OnInit } from '@angular/core';
import { Album } from '../models/album';
import { AlbumService } from '../album.service';
import { Route, ActivatedRoute } from '@angular/router';
import { faPlay, faSearch, faHome, faBook } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

export class HomeComponent implements OnInit {
  albums: Album[];
  icons = [faPlay, faBook, faHome, faSearch];

  constructor(
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) { }

  getAlbums(): void{
    this.albumService.getAlbums()
      .subscribe(
        albums => this.albums = albums,
        err => console.log(err),
        () => console.log('loading done')
      );
  }

  ngOnInit() {
    this.getAlbums();
    console.log(`Albums: ${this.albums}`);  
  }

}
