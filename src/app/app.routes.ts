import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { ArtistsComponent } from "./components/artists/artists.component";
import { AlbumsComponent } from "./components/albums/albums.component";
import { SongsComponent } from "./components/songs/songs.component";
import { GenresComponent } from "./components/genres/genres.component";
import { PlaylistsComponent } from "./components/playlists/playlists.component";
import { PlaylistGroupsComponent } from "./components/playlist-group/playlist-group.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { UsersComponent } from './components/users/users.component';
import { MoodEditorComponent } from "./components/mood-editor/mood-editor.component";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { TermsComponent } from "./components/terms/terms.component";

const routes: Routes = [
  { path: "", pathMatch: "full", redirectTo: "/dashboard" },
  { path: 'login', component: LoginModalComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "artists", component: ArtistsComponent },
  { path: "albums", component: AlbumsComponent },
  { path: "songs", component: SongsComponent },
  // { path: "moods", component: MoodEditorComponent },
  { path: "genres", component: GenresComponent },
  { path: "playlists", component: PlaylistsComponent },
  { path: "users", component: UsersComponent },
  { path: "privacy", component: PrivacyPolicyComponent },
  { path: "terms", component: TermsComponent },
  { path: "playlistGroups", component: PlaylistGroupsComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: true })], // <-- debugging purposes only)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
