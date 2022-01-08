import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-search-user',
  templateUrl: './search-user.component.html',
  styleUrls: ['./search-user.component.scss']
})
export class SearchUserComponent implements OnInit {

  constructor(private http: HttpClient,
    private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  informationObj: any = {};
  userValue = '';

  onUserIdSearch() {
    if (this.userValue) {
      let url = `https://api.github.com/users/${this.userValue}`;
      this.http.get<any>(url).pipe(first())
        .subscribe({
          next: (data) => {
            this.informationObj = data;
            this.addEntry(true);
            this.toastr.success("Sucessfully fetched User", '', {
              positionClass: 'toast-bottom-center'
            });
          },
          error: error => {
            this.toastr.error(error.error.message, '', {
              positionClass: 'toast-bottom-center'
            });
            this.addEntry(false);
          }
        });
    } else {
      this.toastr.error("Please first select user", '', {
        positionClass: 'toast-bottom-center'
      });
    }
  }

  addEntry(isSucessful) {
    let pastSearches: any = localStorage.getItem("pastSearches");
    pastSearches = JSON.parse(pastSearches);
    let user = pastSearches.find((ele) => { return ele.userid === this.userValue });
    if (!user) {
      let searchObj = {
        userid: this.userValue,
        isSucessful: isSucessful,
        isFavourite: false,
      }
      pastSearches.push(searchObj);
    }
    localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
  }

  markFavourite() {
    if (this.userValue) {
      let pastSearches: any = localStorage.getItem("pastSearches");
      pastSearches = JSON.parse(pastSearches);
      let user = pastSearches.find((ele) => { return ele.userid === this.userValue });
      if (user) {
        user.isFavourite = true;
        localStorage.setItem("pastSearches", JSON.stringify(pastSearches));
        this.toastr.success("Sucessfully added as favourite", '', {
          positionClass: 'toast-bottom-center'
        });
      }
    } else {
      this.toastr.error("Please first select user", '', {
        positionClass: 'toast-bottom-center'
      });
    }
  }

}

