import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from "@angular/http";
import { HttpClientModule }    from '@angular/common/http';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

// components
import { AppComponent } from './app.component';
import { AppRoutingModule } from './/app-routing.module';


// services
import { APIUtilService } from '../services/apiUtils';
import { LoanDetailComponent } from './loan-detail/loan-detail.component';
import { LoansComponent } from './loans/loans.component';

@NgModule({
  declarations: [
    AppComponent,
    LoanDetailComponent,
    LoansComponent,
  ],
  imports: [
    NgbModule,
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    HttpModule,
    FormsModule,
    FontAwesomeModule
  ],
  providers: [
    APIUtilService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
