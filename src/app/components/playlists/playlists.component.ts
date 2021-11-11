import { Component, OnInit, Input } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";
import "../../../assets/js/demo.js";
import swal from "sweetalert";
declare var demo: any;

@Component({
  selector: "app-playlists",
  templateUrl: "./playlists.component.html",
  styleUrls: ["./playlists.component.css"],
})
export class PlaylistsComponent implements OnInit {
  notifications;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpService,
    private util: UtilityService
  ) {}

  ngOnInit() {
    this.getNotifications();
  }

  getNotifications(): void {
    this.spinner.show();

    this.http
      .get("notifications/fetchAll")
      .then((success) => {
        console.log(success);
        this.spinner.hide();
        this.notifications = success.body.data;
        console.log("ye hai notifications");
        console.log(this.notifications);
      })
      .catch((err: Response) => {
        this.spinner.hide();
        if (err["error"]) demo.showErrorNotification(err["error"].message);
      });
  }
}
