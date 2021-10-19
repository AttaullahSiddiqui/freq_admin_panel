import { Component, OnInit, Inject } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material";
import { environment } from "../../../environments/environment";

@Component({
  selector: "app-song-player",
  templateUrl: "./song-player.component.html",
  styleUrls: ["./song-player.component.css"],
})
export class SongPlayerComponent implements OnInit {
  getFileUrl = environment.getFileUrl;
  program: any;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {
    this.program = data.program;
  }

  ngOnInit() {}
}
