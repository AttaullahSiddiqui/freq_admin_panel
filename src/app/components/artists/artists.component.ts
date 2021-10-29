import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import "../../../assets/js/demo.js";
import swal from "sweetalert";
declare var demo: any;

import { ArtistEditorComponent } from "../artist-editor/artist-editor.component";
import { ArtistAlbumsComponent } from "../artist-albums/artist-albums.component";

import { Artist } from "../../models/Artist";

@Component({
  selector: "app-artists",
  templateUrl: "./artists.component.html",
  styleUrls: ["./artists.component.css"],
})
export class ArtistsComponent implements OnInit {
  artists: any[] = [];
  originalArtists: any;

  public isSearching = false;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router
  ) { }

  ngOnInit() {
    this.getArtists();
    this.listenForSearchInput(500);
  }

  getArtists(): void {
    this.spinner.show();

    // this.firestoreService.getArtists().then((result: any) => {
    //   this.artists = result.artists;
    //   this.originalArtists = this.artists;

    //   this.spinner.hide();
    // });
  }

  addNewArtist(): void {
    const dialogRef = this.dialog.open(ArtistEditorComponent, {
      width: "500px",
      data: {
        isEditMode: false,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Add new artist
        this.artists.unshift(result.newArtist);
        demo.showSuccessNotification("Artist successfully added!");
      }
    });
  }

  edit(artist: Artist) {
    const dialogRef = this.dialog.open(ArtistEditorComponent, {
      width: "650px",
      data: {
        isEditMode: true,
        artist: artist,
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result.isSuccess) {
        // Edit name
        if (result.artistNameUpdated) {
          artist.name = result.newArtistName;
          demo.showSuccessNotification("Artist name successfully updated!");
        }

        // Edit picture
        else if (result.artistPictureUpdated) {
          artist.picture = result.newArtistPicture;
          demo.showSuccessNotification("Artist picture successfully updated!");
        }
      }
    });
  }

  delete(artist: Artist) {
    const options = {
      title: "Delete Artist?",
      text: "Are you sure you want to delete this artist? All associated albums and songs will also be deleted.",
      icon: "error",
      buttons: ["Cancel", "Ok"],
      dangerMode: true,
    };

    swal(options).then((willDelete) => {
      if (willDelete) {
        this.spinner.show();

        // Delete artist
        // this.firestoreService.deleteArtist(artist).then(
        //   (result: any) => {
        //     this.removeArtistFromList(artist);
        //     demo.showSuccessNotification("Artist successfully deleted!");

        //     this.spinner.hide();
        //   },
        //   (error: any) => {
        //     this.spinner.hide();
        //     demo.showErrorNotification("An error occured: " + error);
        //   }
        // );
      }
    });
  }

  removeArtistFromList(artist: Artist) {
    const index = this.artists.indexOf(artist);
    if (index > -1) {
      this.artists.splice(index, 1);
    }
  }

  listenForSearchInput(timeoutTime: number): any {
    const searchInput = <HTMLInputElement>(
      document.getElementById("searchInput")
    );
    let timeout: any = null;

    searchInput.onkeyup = (e) => {
      clearTimeout(timeout);

      timeout = setTimeout(() => {
        this.searchArtists(searchInput.value);
      }, timeoutTime);
    };
  }

  searchArtists(searchValue: string) {
    this.isSearching = true;

    if (searchValue !== "" && searchValue.length >= 3) {
      this.spinner.show();

      this.artists = [];

      // this.firestoreService.getArtists().then((result: any) => {
      //   result.artists.forEach(artist => {
      //     if (
      //       artist.name.toLowerCase().indexOf(searchValue.toLowerCase()) > -1
      //     ) {
      //       this.artists.push(artist);
      //     }
      //   });

      //   this.spinner.hide();
      // });
    } else if (searchValue === "") {
      this.clearSearchInput();
    }
  }

  clearSearchInput() {
    this.artists = this.originalArtists;
    this.isSearching = false;

    const searchInput = <HTMLInputElement>(
      document.getElementById("searchInput")
    );
    searchInput.value = "";
  }

  viewAlbums(artist: Artist) {
    const dialogRef = this.dialog.open(ArtistAlbumsComponent, {
      data: {
        artist: artist,
      },
    });

    dialogRef.afterClosed().subscribe((result) => { });
  }
}
