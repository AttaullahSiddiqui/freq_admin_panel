import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Users } from "src/app/models/users";

import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";
import swal from "sweetalert";
declare var demo: any;

@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: any = [];
  constructor(
    private spinner: NgxSpinnerService,
    private http: HttpService,
    private util: UtilityService
  ) {}

  ngOnInit() {
    this.spinner.show();
    this.getUsers();
  }

  getUsers() {
    this.http
      .get("user/getall")
      .then((success) => {
        console.log(success);
        this.spinner.hide();
        this.users = success.body.data;
      })
      .catch((err: Response) => {
        this.spinner.hide();
        demo.showErrorNotification(err["error"].message);
      });
  }
}
