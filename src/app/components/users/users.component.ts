import { Component, OnInit } from "@angular/core";
import { NgxSpinnerService } from "ngx-spinner";
import { Users } from "src/app/models/users";
@Component({
  selector: "app-users",
  templateUrl: "./users.component.html",
  styleUrls: ["./users.component.css"],
})
export class UsersComponent implements OnInit {
  users: any;
  constructor(private spinner: NgxSpinnerService) {}

  ngOnInit() {
    this.spinner.show();
    // this.firestoreService.getUsers()
    //   .then((res: any) => {
    //     this.spinner.hide();
    //     this.users = res.users;
    //     console.log('res', res);
    //   })
  }
}
