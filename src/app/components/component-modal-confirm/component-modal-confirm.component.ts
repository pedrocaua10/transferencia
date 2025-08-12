import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-component-modal-confirm',
  templateUrl: './component-modal-confirm.component.html',
  styleUrls: ['./component-modal-confirm.component.css']
})
export class ComponentModalConfirmComponent implements OnInit {
  dadosTransacao: any = {};
  destinatario: string = '';

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.dadosTransacao = this.transactionService.currentValue || {};
    this.destinatario = this.dadosTransacao.destinatario || '';
  }

  voltar() {
    this.router.navigate(['/cartao']);
  }

  confirmar() {
    this.router.navigate(['/sucesso']);
  }
}