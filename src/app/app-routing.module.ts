import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ComponentMoneyComponent } from './components/component-money/component-money.component';
import { ComponentModalComponent } from './components/component-modal/component-modal.component';
import { ComponentModalConfirmComponent } from './components/component-modal-confirm/component-modal-confirm.component';
import { ComponentModalSuccessComponent } from './components/component-modal-success/component-modal-success.component';

const routes: Routes = [
  { path: '', redirectTo: 'money', pathMatch: 'full' },
  { path: 'money', component: ComponentMoneyComponent },
  { path: 'cartao', component: ComponentModalComponent },
  { path: 'confirmar', component: ComponentModalConfirmComponent },
  { path: 'sucesso', component: ComponentModalSuccessComponent },
  { path: '**', redirectTo: 'money' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { 
    useHash: true,
    enableTracing: false
  })],
  exports: [RouterModule]
})
export class AppRoutingModule { }