import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http'
import { ReactiveFormsModule } from '@angular/forms';
import { AuthGuard } from './auth.guard';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from 'src/app/Components/login/login.component';
import { BindingComponent } from './Components/binding/binding.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { TreepointAfterPipe } from './Pipes/treepoint-after.pipe';
import { CarsDisplayComponent } from './Components/cars/cars-display/cars-display.component';
import { CarsAddComponent } from './Components/cars/cars-add/cars-add.component';
import { CarsUpdateComponent } from './Components/cars/cars-update/cars-update.component';
import { CarsDeleteComponent } from './Components/cars/cars-delete/cars-delete.component';
import { MenuComponent } from './Components/menu/menu.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    BindingComponent,
    TreepointAfterPipe,
    CarsDisplayComponent,
    CarsAddComponent,
    CarsUpdateComponent,
    CarsDeleteComponent,
    MenuComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [AuthGuard],
  bootstrap: [AppComponent]
})
export class AppModule { }







// til angular.jason i serve hvis der certifcat krav
//,
//"ssl": {
//  "browserTarget": "Angular-first:build:development",
//  "sslKey": "src/assets/CATest-client+4-key.pem",
//  "sslCert": "src/assets/CATest-client+4.pem"
//}