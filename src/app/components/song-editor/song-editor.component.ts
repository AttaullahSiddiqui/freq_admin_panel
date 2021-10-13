import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Input,
  AfterViewInit,
  Inject,
} from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";

import "../../../assets/js/demo.js";
declare var demo: any;

import { Album } from "../../models/Albums";
import { Program } from "../../models/Program";
import { Artist } from "../../models/Artist";
import { Genre } from "../../models/Genre";

@Component({
  selector: "app-song-editor",
  templateUrl: "./song-editor.component.html",
  styleUrls: ["./song-editor.component.css"],
})
export class SongEditorComponent implements AfterViewInit {
  categoriesArray = [];

  name = "";
  programId = "";
  currentSong = "";
  currentPicture = "";
  categories = [];

  isEditMode = false;

  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private util: UtilityService,
    public dialogRef: MatDialogRef<SongEditorComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    this.spinner.show();
    this.isEditMode = data.isEditMode;

    if (this.isEditMode) {
      this.name = data.program.name;
      this.programId = data.program.songId;
      this.categories = data.program.artistId;
      this.currentSong = data.program.url;
      this.currentPicture = data.program.picture;
    }
  }

  ngAfterViewInit() {
    this.getCategories();
  }

  getCategories(): void {
    this.http
      .get("category/forSelect")
      .then((success) => {
        console.log(success);
        this.spinner.hide();
        this.categoriesArray = success.body.data;
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });

    // this.firestoreService.getArtists().then((result: any) => {
    //   this.artists = result.artists;

    //   this.selectedArtist = this.artists.find(
    //     x => x.artistId === this.artistId
    //   );

    //   this.getArtistAlbums();

    //   this.spinner.hide();
    // });
  }

  addNewProgram() {
    const programSong = (<HTMLInputElement>(
      document.getElementById("programSong")
    )).files[0];
    const programPicture = (<HTMLInputElement>(
      document.getElementById("programPicture")
    )).files[0];
    console.log(programSong);
    console.log(programPicture);
    if (
      !this.name ||
      !this.categories.length
      // !programSong ||
      // !programPicture
    ) {
      demo.showWarningNotification("All fields required");
      return;
    }

    this.spinner.show();
    let formData = new FormData();
    // formData.append("program", programPicture);
    // formData.append("program", programSong);
    formData.append("name", this.name);
    for (var i = 0; i < this.categories.length; i++) {
      formData.append("categories[]", this.categories[i]);
    }

    this.http
      .post("programs/add", formData, { isMultiPartFormData: true })
      .then((success) => {
        this.spinner.hide();
        this.dialogRef.close({
          isSuccess: true,
          newProgram: success.body.data,
        });
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });

    this.spinner.hide();
    this.dialogRef.close();
  }

  updateProgram() {
    const newSong = (<HTMLInputElement>document.getElementById("programSong"))
      .files[0];
    const newProgramPicture = (<HTMLInputElement>(
      document.getElementById("programPicture")
    )).files[0];
    if (
      this.name == this.data.program.name &&
      this.categories == this.data.program.categories &&
      !newSong
    ) {
      demo.showWarningNotification("No changes made");
      return;
    }
    this.spinner.show();

    let formData = new FormData();
    if (newSong) formData.append("categoryPicture", newSong);
    formData.append("name", this.name);
    for (var i = 0; i < this.categories.length; i++) {
      formData.append("categories[]", this.categories[i]);
    }
    formData.append("programId", this.programId);

    if (newSong) formData.append("currentSong", this.currentSong);
    if (newProgramPicture)
      formData.append("currentPicture", this.currentPicture);

    this.http
      .post("programs/edit", formData, { isMultiPartFormData: true })
      .then((success) => {
        this.spinner.hide();
        this.dialogRef.close({
          isSuccess: true,
          updateProgram: success.body.data,
        });
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }
  closeEditor() {
    this.dialogRef.close({
      isSuccess: false,
    });
  }
}
