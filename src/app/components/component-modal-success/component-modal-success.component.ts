import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-component-modal-success',
  templateUrl: './component-modal-success.component.html',
  styleUrls: ['./component-modal-success.component.css']
})
export class ComponentModalSuccessComponent implements OnInit {
  valor: number = 0;
  destinatario: string = '';
  dataTransacao: string;

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private datePipe: DatePipe
  ) {
    this.dataTransacao = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm') || '';
  }

  ngOnInit() {
    const data = this.transactionService.currentValue;
    if (data) {
      this.valor = data.valor;
      this.destinatario = data.destinatario || '';
    }
  }

  novaTransferencia() {
    this.transactionService.clearData();
    this.router.navigate(['/money']);
  }
}