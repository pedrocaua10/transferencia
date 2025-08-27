import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentMoneyComponent } from './components/component-money/component-money.component';
import { ComponentModalComponent } from './components/component-modal/component-modal.component';
import { ComponentModalConfirmComponent } from './components/component-modal-confirm/component-modal-confirm.component';
import { ComponentModalSuccessComponent } from './components/component-modal-success/component-modal-success.component';
import { TransactionService } from './services/transaction.service';
import { CardManagementComponent } from './components/card-management/card-management.component';
import { NewCardComponent } from './components/new-card/new-card.component';
import { LocalizationService } from './services/localization.service'; 

@NgModule({
  declarations: [
    AppComponent,
    ComponentMoneyComponent,
    ComponentModalComponent,
    ComponentModalConfirmComponent,
    ComponentModalSuccessComponent,
    NewCardComponent,
    CardManagementComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule
  ],
  providers: [
    TransactionService,
    DatePipe,
    LocalizationService 
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }