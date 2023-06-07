import { Component, OnInit, ViewChild } from "@angular/core";
import { first } from "rxjs/operators";
import Swal from "sweetalert2";
import { AccountService } from "@app/_services";
import { DataTableDirective } from "angular-datatables";

@Component({ templateUrl: "list.component.html" })
export class ListComponent implements OnInit {
  users?: any[];

  @ViewChild(DataTableDirective, { static: false })
  datatableElement!: DataTableDirective;
  dtOptions: DataTables.Settings = {};

  constructor(private accountService: AccountService) {}

  editNotification() {
    Swal.fire({
      title: `Employee is successfully edited.`,
      width: 600,
      padding: "3em",
      color: "#000000",
      background: "#FFFF00",
    });
  }

  deleteNotification() {
    Swal.fire({
      title: `Employee is successfully deleted.`,
      width: 600,
      padding: "3em",
      color: "#000000",
      background: "#EE4B2B",
    });
  }

  ngOnInit() {
    this.dtOptions = {
      columns: [
        { title: "Username", data: "username" },
        { title: "First name", data: "First Name" },
        { title: "Last name", data: "Last name" },
        { title: "Email", data: "Email" },
        { title: "Birthday", data: "Birthday" },
        { title: "Basic Salary", data: "Basic Salary" },
        { title: "Status", data: "Status" },
        { title: "Group", data: "Group" },
        { title: "Description", data: "Description" },
        { title: "Action", data: "Action" },
        { title: "Detail", data: "Detail" },
      ],
      stateSave: true,
    };
    this.accountService
      .getAll()
      .pipe(first())
      .subscribe((users) => (this.users = users));
  }
}
