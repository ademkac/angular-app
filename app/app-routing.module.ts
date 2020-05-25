import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { PhoneComponent } from './phone/phone.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { PhoneStartComponent } from './phone/phone-start/phone-start.component';
import { PhoneDetailComponent } from './phone/phone-detail/phone-detail.component';
import { PhoneEditComponent } from './phone/phone-edit/phone-edit.component';
import { PhoneResolverService } from './phone/phone-resolver.service';
import { AuthComponent } from './auth/auth.component';
import { AuthGuard } from './auth/auth.guard';

const appRoutes: Routes = [
    {path: '', redirectTo: '/phones', pathMatch: 'full' },
    {path: 'phones',
     component: PhoneComponent,
     canActivate: [AuthGuard],
     children: [
        {path: '', component: PhoneStartComponent},
        {path: 'new', component: PhoneEditComponent},
        {
            path: ':id',
            component: PhoneDetailComponent,
            resolve: [PhoneResolverService]
        },
        {
            path: ':id/edit',
            component: PhoneEditComponent,
            resolve: [PhoneResolverService]
        }
    ]},
    {path: 'shopping-list', component: ShoppingListComponent},
    {path: 'auth', component: AuthComponent}
]

@NgModule({
    imports: [RouterModule.forRoot(appRoutes)],
    exports: [RouterModule]
})

export class AppRoutingModule {

}