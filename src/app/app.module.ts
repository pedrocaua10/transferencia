import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ComponentMoneyComponent } from './components/component-money/component-money.component';
import { ComponentModalComponent } from './components/component-modal/component-modal.component';
import { ComponentModalConfirmComponent } from './components/component-modal-confirm/component-modal-confirm.component';
import { ComponentModalSuccessComponent } from './components/component-modal-success/component-modal-success.component';
import { TransactionService } from './services/transaction.service';

@NgModule({
  declarations: [
    AppComponent,
    ComponentMoneyComponent,
    ComponentModalComponent,
    ComponentModalConfirmComponent,
    ComponentModalSuccessComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule
  ],
  providers: [
    TransactionService,
    DatePipe
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }