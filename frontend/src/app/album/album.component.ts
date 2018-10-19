import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router'
import { Howl, Howler } from 'howler';

import { Album } from '../models/album';
import { Song } from '../models/song'
import { faPlay} from '@fortawesome/free-solid-svg-icons';

import { AlbumService } from '../album.service'
import { SongsService } from '../songs.service'

@Component({
  selector: "app-album",
  templateUrl: "./album.component.html",
  styleUrls: ["./album.component.css"]
})
export class AlbumComponent implements OnInit {
  album;
  songs;
  history = [];
  faPlay = faPlay;
  url = 'http://localhost:3000/data/';

  constructor(
    private songsService: SongsService,
    private albumService: AlbumService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    this.getSongs();
  }

  id = +this.route.snapshot.paramMap.get("id");

  getSongs(): void {
    this.albumService.getAlbumSongs(this.id).subscribe(album => {
      this.album = album["info"];
      this.songs = album["songs"];
    });
  }

  playSound(song) {
    const sound = new Howl({
      src: [song.url]
    });

    sound.play();

    // Change global volume.
    Howler.volume(0.5);
  }
}
