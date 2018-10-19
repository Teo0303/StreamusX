import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router'

import { Album } from '../models/album';
import { Song } from '../models/song'

import { AlbumService } from '../album.service'
import { SongsService } from '../songs.service'

@Component({
  selector: 'app-artist',
  templateUrl: './artist.component.html',
  styleUrls: ['./artist.component.css']
})
export class ArtistComponent implements OnInit {
  ngOnInit(){}

}
