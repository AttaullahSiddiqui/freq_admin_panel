import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { NgxSpinnerService } from "ngx-spinner";
import { MatDialog } from "@angular/material/dialog";
import { HttpService, Response } from "../../services/http.service";
import { UtilityService } from "../../services/utility.service";
import swal from "sweetalert";
declare var demo: any;

@Component({
  selector: "app-sendmail",
  templateUrl: "./sendmail.component.html",
  styleUrls: ["./sendmail.component.css"],
})
export class SendMailComponent implements OnInit {
  emailData: any = { email: null, subject: null, emailBody: null };
  isLoading = false;

  constructor(
    private spinner: NgxSpinnerService,
    private dialog: MatDialog,
    private router: Router,
    private http: HttpService,
    private util: UtilityService
  ) {}

  ngOnInit() {}

  sendMail() {
    if (this.isLoading) return;
    if (
      !this.emailData.email ||
      !this.emailData.subject ||
      !this.emailData.emailBody
    ) {
      demo.showWarningNotification("One of the form fields is empty");
      return;
    }
    this.isLoading = true;
    this.spinner.show();
    let payload = this.emailData;

    this.http
      .post("user/sendEmail", payload)
      .then((success) => {
        this.spinner.hide();
        this.isLoading = false;
        this.emailData = { email: null, subject: null, emailBody: null };
        demo.showSuccessNotification("Email successfully sent to User!");
      })
      .catch((err: Response) => {
        this.spinner.hide();
        this.isLoading = false;
        if (err["error"]) demo.showErrorNotification(err["error"].message);
      });
  }
}
