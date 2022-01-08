import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'github-users';

  ngOnInit() {
    let pastSearches : any = localStorage.getItem("pastSearches");
    if(!pastSearches) {
      localStorage.setItem("pastSearches", JSON.stringify([]));
    }
  }
}
