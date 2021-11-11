import { NgModule } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { DashboardComponent } from "./components/dashboard/dashboard.component";
// import { ArtistsComponent } from "./components/artists/artists.component";
// import { AlbumsComponent } from "./components/albums/albums.component";
import { SongsComponent } from "./components/songs/songs.component";
import { GenresComponent } from "./components/genres/genres.component";
import { PlaylistsComponent } from "./components/playlists/playlists.component";
import { SendMailComponent } from "./components/sendmail/sendmail.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";
import { UsersComponent } from "./components/users/users.component";
// import { MoodEditorComponent } from "./components/mood-editor/mood-editor.component";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { TermsComponent } from "./components/terms/terms.component";
import { NotesComponent } from "./components/notes/notes.component";

const routes: Routes = [
  { path: "login", component: LoginModalComponent },
  // { path: "artists", component: ArtistsComponent },
  // { path: "albums", component: AlbumsComponent },
  { path: "songs", component: SongsComponent },
  // { path: "moods", component: MoodEditorComponent },
  { path: "genres", component: GenresComponent },
  { path: "dashboard", component: DashboardComponent },
  { path: "notes", component: NotesComponent },
  { path: "notifications", component: PlaylistsComponent },
  { path: "users", component: UsersComponent },
  { path: "privacy", component: PrivacyPolicyComponent },
  { path: "terms", component: TermsComponent },
  { path: "sendmail", component: SendMailComponent },
  { path: "**", redirectTo: "/sendmail" },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { enableTracing: false })], // <-- debugging purposes only)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
