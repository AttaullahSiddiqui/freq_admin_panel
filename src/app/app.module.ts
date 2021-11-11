import { BrowserModule } from "@angular/platform-browser";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from "@angular/core";
import { NgSelectModule } from "@ng-select/ng-select";

import { RouterModule, Routes } from "@angular/router";
import { NgxSpinnerModule } from "ngx-spinner";
import { MatDialogModule } from "@angular/material/dialog";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LocationStrategy, PathLocationStrategy } from "@angular/common";

import { AppComponent } from "./app.component";
import { AppRoutingModule } from "./app.routes";
import { DashboardComponent } from "./components/dashboard/dashboard.component";
import { SongsComponent } from "./components/songs/songs.component";
import { ArtistsComponent } from "./components/artists/artists.component";
import { AlbumsComponent } from "./components/albums/albums.component";
import { SongEditorComponent } from "./components/song-editor/song-editor.component";
import { ArtistEditorComponent } from "./components/artist-editor/artist-editor.component";
import { AlbumEditorComponent } from "./components/album-editor/album-editor.component";
import { PlaylistsComponent } from "./components/playlists/playlists.component";
import { PlaylistEditorComponent } from "./components/playlist-editor/playlist-editor.component";
import { PlaylistSongsEditorComponent } from "./components/playlist-songs-editor/playlist-songs-editor.component";
import { SongPlayerComponent } from "./components/song-player/song-player.component";
import { AlbumSongsComponent } from "./components/album-songs/album-songs.component";
import { ArtistAlbumsComponent } from "./components/artist-albums/artist-albums.component";
import { SendMailComponent } from "./components/sendmail/sendmail.component";
import { GenresComponent } from "./components/genres/genres.component";
import { NotesComponent } from "./components/notes/notes.component";
import { GenreSongsEditorComponent } from "./components/genre-songs-editor/genre-songs-editor.component";
import { PlaylistGroupEditorComponent } from "./components/playlist-group-editor/playlist-group-editor.component";
// tslint:disable-next-line:max-line-length
import { PlaylistGroupPlaylistsEditorComponent } from "./components/playlist-group-playlists-editor/playlist-group-playlists-editor.component";
import { LoginModalComponent } from "./components/login-modal/login-modal.component";

import { UsersComponent } from "./components/users/users.component";
import { MoodEditorComponent } from "./components/mood-editor/mood-editor.component";
import { NoteEditorComponent } from "./components/note-editor/note-editor.component";
import { UserProfileComponent } from "./components/user-profile/user-profile.component";
import { AngularEditorModule } from "@kolkov/angular-editor";

import { ChartsModule } from "ng2-charts";

import { CsvBuilder } from "filefy";
import { PrivacyPolicyComponent } from "./components/privacy-policy/privacy-policy.component";
import { HttpClientModule } from "@angular/common/http";
import { MatSnackBar, MatSnackBarModule } from "@angular/material/snack-bar";
import { TermsComponent } from "./components/terms/terms.component";
import { MaterialModule } from "./material.module";

// Initialize Firebase
const firebaseConfig = {
  // apiKey: "AIzaSyCUjxbDslfmSeNCwDcClzXR1d1hIzQLw50",
  // authDomain: "ionspotify-f5c12.firebaseapp.com",
  // databaseURL: "https://ionspotify-f5c12.firebaseio.com",
  // projectId: "ionspotify-f5c12",
  // storageBucket: "ionspotify-f5c12.appspot.com",
  // messagingSenderId: "395983984847"
  apiKey: "AIzaSyCuY7JFQN1U5uwM-fGklB-WD0FG3avAD_w",
  authDomain: "neura-9b648.firebaseapp.com",
  projectId: "neura-9b648",
  storageBucket: "neura-9b648.appspot.com",
  messagingSenderId: "859510816624",
  appId: "1:859510816624:web:bb8c43ce50cce6e95e19b5",
};

@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    SongsComponent,
    ArtistsComponent,
    AlbumsComponent,
    SongEditorComponent,
    ArtistEditorComponent,
    AlbumEditorComponent,
    PlaylistsComponent,
    PlaylistEditorComponent,
    PlaylistSongsEditorComponent,
    SongPlayerComponent,
    AlbumSongsComponent,
    ArtistAlbumsComponent,
    SendMailComponent,
    GenresComponent,
    NotesComponent,
    GenreSongsEditorComponent,
    MoodEditorComponent,
    NoteEditorComponent,
    UserProfileComponent,
    PlaylistGroupEditorComponent,
    PlaylistGroupPlaylistsEditorComponent,
    LoginModalComponent,
    PrivacyPolicyComponent,
    TermsComponent,
    UsersComponent,
  ],
  entryComponents: [
    ArtistEditorComponent,
    AlbumEditorComponent,
    SongEditorComponent,
    PlaylistEditorComponent,
    PlaylistSongsEditorComponent,
    SongPlayerComponent,
    ArtistAlbumsComponent,
    AlbumSongsComponent,
    GenreSongsEditorComponent,
    PlaylistGroupEditorComponent,
    PlaylistGroupPlaylistsEditorComponent,
    MoodEditorComponent,
    NoteEditorComponent,
    UserProfileComponent,
    // CsvBuilder,
    SendMailComponent,
    LoginModalComponent,
  ],
  imports: [
    FormsModule,
    AppRoutingModule,
    BrowserModule,
    NgxSpinnerModule,
    ChartsModule,
    MatDialogModule,
    NgSelectModule,
    MatSnackBarModule,
    BrowserAnimationsModule,
    AngularEditorModule,
    MaterialModule,
    ChartsModule,
    HttpClientModule,
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],

  providers: [
    MatSnackBar,
    // CsvBuilder,
    // {
    //   provide: LocationStrategy,
    //   useClass: PathLocationStrategy,
    // },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
