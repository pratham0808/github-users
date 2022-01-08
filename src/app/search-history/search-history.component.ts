import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search-history',
  templateUrl: './search-history.component.html',
  styleUrls: ['./search-history.component.scss']
})
export class SearchHistoryComponent implements OnInit {

  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  pastSearches: any = [];
  informationObj: any = {};
  foods = [
    { value: 'steak-0', viewValue: 'Steak' },
    { value: 'pizza-1', viewValue: 'Pizza' },
    { value: 'tacos-2', viewValue: 'Tacos' },
  ];

  ngOnInit(): void {
    this.pastSearches = localStorage.getItem("pastSearches");
    this.pastSearches = JSON.parse(this.pastSearches);
  }

  onUserIdSearch(userValue) {
    let url = `https://api.github.com/users/${userValue}`;
    this.http.get<any>(url).pipe(first())
      .subscribe({
        next: (data) => {
          this.informationObj = data;
        },
        error: error => {
          this.toastr.error(error.error.message, '', {
            positionClass: 'toast-bottom-center'
          });

        }
      });
  }

  deleteItem(event, userid) {
    event.stopPropagation();
    let pastSearches: any = localStorage.getItem("pastSearches");
    pastSearches = JSON.parse(pastSearches);
    pastSearches = pastSearches.filter(item => item.userid !== userid);
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
    this.toastr.success("Sucessfully Deleted Userid", '', {
      positionClass: 'toast-bottom-center'
    });
    this.pastSearches = localStorage.getItem("pastSearches");
    this.pastSearches = JSON.parse(this.pastSearches);
  }

  markFavourite(event, userObj) {
    event.stopPropagation();
    let pastSearches: any = localStorage.getItem("pastSearches");
    pastSearches = JSON.parse(pastSearches);
    let user = pastSearches.find((ele) => { return ele.userid === userObj.userid });
    user.isFavourite = !user.isFavourite;
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
    this.toastr.success("Sucessfully changed", '', {
      positionClass: 'toast-bottom-center'
    });
    this.pastSearches = localStorage.getItem("pastSearches");
    this.pastSearches = JSON.parse(this.pastSearches);
  }

  goBack() {
    this.informationObj = {};
  }

  clearAll() {
    localStorage.setItem("pastSearches", JSON.stringify([]));
    this.pastSearches = localStorage.getItem("pastSearches");
    this.pastSearches = JSON.parse(this.pastSearches);
    this.toastr.success("Sucessfully cleared All searches", '', {
      positionClass: 'toast-bottom-center'
    });
  }

}
