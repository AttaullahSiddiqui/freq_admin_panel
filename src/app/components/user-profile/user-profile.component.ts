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
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";

import "../../../assets/js/demo.js";
declare var demo: any;

@Component({
  selector: "app-user-profile",
  templateUrl: "./user-profile.component.html",
  styleUrls: ["./user-profile.component.css"],
})
export class UserProfileComponent implements OnInit {
  userId;
  userData;
  constructor(
    private spinner: NgxSpinnerService,
    public dialogRef: MatDialogRef<UserProfileComponent>,
    private http: HttpService,
    private util: UtilityService,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) {
    if (data.userId) this.userId = data.userId;
  }

  ngOnInit() {
    this.fetchUserData();
  }

  fetchUserData() {
    this.spinner.show();
    let payload = {
      userId: this.userId,
    };
    this.http
      .post("user/profile", payload)
      .then((success) => {
        this.spinner.hide();
        console.log(success);
        this.userData = success.body.data["0"];
      })
      .catch((err: Response) => {
        this.spinner.hide();
        if (err["error"]) demo.showErrorNotification(err["error"].message);
      });
  }

  closeEditor() {
    this.dialogRef.close();
  }
}
