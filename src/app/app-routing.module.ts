import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SearchHistoryComponent } from './search-history/search-history.component';
import { SearchUserComponent } from './search-user/search-user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';

const routes: Routes = [
    { path: '', component: SearchUserComponent },
    { path: 'search', component: SearchUserComponent },
    { path: 'history', component: SearchHistoryComponent },
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }