import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { CarsAddComponent } from './Components/cars/cars-add/cars-add.component';
import { CarsUpdateComponent } from './Components/cars/cars-update/cars-update.component';
import { CarsDeleteComponent } from './Components/cars/cars-delete/cars-delete.component';
import { CarsDisplayComponent } from './Components/cars/cars-display/cars-display.component';
import { AuthGuard } from './auth.guard';

const routes: Routes = [
  { path: 'login', component: LoginComponent },
  {
    path: 'menu', // The menu route
    canActivate: [AuthGuard], // Protect the menu route as well
    children: [
      { path: 'cars', children: [
          { path: 'display', component: CarsDisplayComponent },
          { path: 'add', component: CarsAddComponent },
          { path: 'update', component: CarsUpdateComponent },
          { path: 'delete', component: CarsDeleteComponent },
        ]
      },
      // Add more protected routes here if needed
    ],
  },
  { path: '', redirectTo: 'menu', pathMatch: 'full' }, // Redirect to menu by default
  { path: '**', redirectTo: 'menu' }, // Redirect to menu for invalid routes
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
