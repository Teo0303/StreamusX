import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ArtistComponent } from './artist/artist.component';
import { AlbumComponent } from './album/album.component';
import { SearchComponent } from './search/search.component';
import { HomeComponent } from './home/home.component';

const appRoutes: Routes = [
  { path: "", redirectTo: "browse", pathMatch: "full" },
  { path: "search", component: SearchComponent },
  { path: "artist/:id", redirectTo: "album/:id/songs", pathMatch: "full"},
  { path: "album/:id/songs", component: AlbumComponent },
  { path: "browse", component: HomeComponent },
  { path: "**", component: HomeComponent }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes)
  ],
  exports: [ RouterModule ]
})

export class AppRoutingModule {}