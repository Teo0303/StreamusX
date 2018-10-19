import {Component, OnInit, ViewChild, ElementRef} from '@angular/core';
import { Howl, Howler} from 'howler';
import { timer } from 'rxjs';
import { faPlay, faStepForward, faPause, faStepBackward, faRandom, faBackward } from "@fortawesome/free-solid-svg-icons";
 
@Component({
  selector: "app-player",
  templateUrl: "./player.component.html",
  styleUrls: ["./player.component.css"]
})
export class PlayerComponent implements OnInit {

  ngOnInit() {
  }

  playlist = [
  {
    name: "Intro (Slim Shady)",
    artistId: 2,
    artistName: "Eminem",
    cover: "http://localhost:3000/data/artists/1/albums/Kamikaze/Kamikaze.jpg",
    howl: null,
    src:
      "http://localhost:3000/data/artists/1/albums/Kamikaze/1_Eminem-Intro_(Slim_Shady).mp3"
  },
  {
    name: "Low Down (Dirty)",
    artistId: 2,
    artistName: "Eminem",
    cover: "http://localhost:3000/data/artists/1/albums/Kamikaze/Kamikaze.jpg",
    howl: null,
    src:
      "http://localhost:3000/data/artists/1/albums/Kamikaze/2_Eminem-Low_Down,_Dirty.mp3"
  },
  {
    name: "If I had",
    artistId: 2,
    artistName: "Eminem",
    cover: "http://localhost:3000/data/artists/1/albums/Kamikaze/Kamikaze.jpg",
    howl: null,
    src:
      "http://localhost:3000/data/artists/1/albums/Kamikaze/3_Eminem-If_I_Had....mp3"
  },
  {
    name: "Just Don't give a fuck",
    artistId: 2,
    artistName: "Eminem",
    cover: "http://localhost:3000/data/artists/1/albums/Kamikaze/Kamikaze.jpg",
    howl: null,
    src:
      "http://localhost:3000/data/artists/1/albums/Kamikaze/10_Eminem-Just_Don't_Give_A_Fuck_(Radio_Edit).mp3"
  }
];

  playing = false;
  shuffle = false;
  cover;
  songName;
  artistName;
  index = 0;
  track;  
  duration;
  timer;
  faPlay = faPlay;
  faPause = faPause;
  faShuffle = faRandom;
  faRepeat = faBackward;
  faStepBackward = faStepBackward;
  faStepForward = faStepForward;
  progress;

  
  playShuffle() {
    this.shuffle = !this.shuffle;
  }
  
  getProgress(p){
    this.progress = p;
  }
  handleProgress(event, progress: HTMLElement) {
    // this.progress = progress;
    console.log(event.clientX / window.innerWidth);

    progress.style.width = `${event.clientX * 100}%`;
    this.seek(event.clientX / window.innerWidth);
  }
  
  playSound(index) {
    let sound;
    let self = this;
    
    this.playing = true;
    //Check if index valid or not
    index = typeof index === "number" ? index : this.index;

    // Take song with given index from playlist
    let data = this.playlist[index];

    // If we already loaded this track, use the current one.
    // Otherwise, setup and load a new Howl.
    if (data.howl) {
      sound = data.howl;
    } else {
      sound = data.howl = new Howl({
        src: [data.src],
        html5: true,
        onplay: function() {
          // // Start upating the progress of the track.
          this.duration.innerHTML = self.formatTime(Math.round(sound.duration()));

          requestAnimationFrame(self.step.bind(self));
          
        },
        onload: function () {
          this.duration.innerHTML = Math.round(sound.duration());
          console.log(this.duration);
        }, 
        onend: function() { 
          // Stop the wave animation.
          self.skip("next");
          this.progress = "0%";
        }
      });
    }

    sound.play();

    this.cover = data.cover;
    this.songName = data.name;
    this.artistName = data.artistName;
    ///Show the pause button
    self.index = index;
  }

  pause() {
    var self = this;
    // Get the Howl we want to manipulate.
    var sound = self.playlist[self.index].howl;
    this.playing = false;
    // Puase the sound.
    sound.pause();
  }

  skip(direction) {
    let shuffleIndex = Math.round(Math.random() * this.playlist.length - 1);
    let self = this;
    let index;

    if (this.shuffle) {
      // if shuffle button is on then shuffle song order
      index = shuffleIndex;
    } else {
      // otherwise play songs with given order
      index = self.index;
    }

    // If prev button is pressed then decrement song index
    // If next button is pressed then increment song index
    if (direction == "prev") {
      index = index - 1;
      // go to last song if press prev button on the first song
      if (index < 0) {
        index = self.playlist.length - 1;
      }
    } else if (direction == "next"){
      index = index + 1;
      // go to first song if press next button on the last song
      if (index >= self.playlist.length) {
        index = 0;
      }
    }
    self.skipTo(index);
  }
  
  // Function to skip to the given song index
  skipTo(index) {
    let self = this;

    //Stop the current playing track
    if (self.playlist[self.index].howl) {
      self.playlist[self.index].howl.stop();
      self.index = index;
    }

    // Reset the progress.
    this.progress.style.width = "0%";

    self.playSound(index);
  }

  seek(per) {
    let self = this;
    let sound = self.playlist[self.index].howl;

    if (sound.playing()) {
      sound.seek(sound.duration() * per );
    }
  }

  step() {
    let self = this;
    let sound = self.playlist[self.index].howl;
        
    let seek = sound.seek() || 0;
    // this.timer.innerHTML = self.formatTime(Math.round(seek));
    this.progress.style.width = `${((seek / sound.duration()) * 100 || 0)}%`;
        
    if (sound.playing()){
      requestAnimationFrame(self.step.bind(self));
    }
  }
  
  formatTime(secs) {
    let minutes = Math.floor(secs / 60) || 0;
    let seconds = secs - minutes * 60 || 0;
    return minutes + ":" + (seconds < 10 ? "0" : "") + seconds;
  }
  
  /* 
  volumeChange(value) {
    let vol = value / 100;
    console.log(vol);
    if (vol === 0) {
      console.log("mute");
    } else if (vol > 0.7) {
      console.log("high");
    } else if (vol < 0.3 && vol > 0) {
      console.log("low");
    } else {
      console.log("medium");
    }
    this.sound.volume(vol);
  } */

 
}