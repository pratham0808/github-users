import { Component, Input, OnInit } from '@angular/core';
import * as moment from 'moment';
@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.component.html',
  styleUrls: ['./user-profile.component.scss']
})
export class UserProfileComponent implements OnInit {

  @Input()
  informationObj;

  constructor() { }

  ngOnInit(): void {
  }

  formatDate(date) {
    return moment(date).format("DD MM YYYY");
  }
}
