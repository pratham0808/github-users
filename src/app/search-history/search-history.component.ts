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
          this.toastr.error(error.error.message);

        }
      });
  }

  deleteItem(event, userid) {
    event.stopPropagation();
    let pastSearches: any = localStorage.getItem("pastSearches");
    pastSearches = JSON.parse(pastSearches);
    pastSearches = pastSearches.filter(item => item.userid !== userid);
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
    this.toastr.success("Sucessfully Deleted Userid");
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
    this.toastr.success("Sucessfully changed");
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
    this.toastr.success("Sucessfully cleared All searches");
  }

  onSortUserId() {
    this.pastSearches.sort((a, b) => a.userid.localeCompare(b.userid));
    this.toastr.success("Sucessfully sorted By userid");
  }

  onSortFavouriteDesc() {

    this.pastSearches.sort((a, b) => { return a.isFavourite - b.isFavourite });
    this.toastr.success("Sucessfully sorted By Favourite");

  }

  onSortFavouriteAsc() {
    this.pastSearches.sort((a, b) => { return b.isFavourite - a.isFavourite });
    this.toastr.success("Sucessfully sorted By Favourite");
  }
}
