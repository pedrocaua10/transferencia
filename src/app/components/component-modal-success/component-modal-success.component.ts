import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { DatePipe } from '@angular/common';
import { LocalizationService } from '../../services/localization.service';

@Component({
  selector: 'app-component-modal-success',
  templateUrl: './component-modal-success.component.html',
  styleUrls: ['./component-modal-success.component.css']
})
export class ComponentModalSuccessComponent implements OnInit {
  valor: number = 0;
  destinatario: string = '';
  dataTransacao: string;
  currentLanguage: string = 'pt-BR'; 

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private datePipe: DatePipe,
    private localizationService: LocalizationService 
  ) {
    this.dataTransacao = this.datePipe.transform(new Date(), 'dd/MM/yyyy HH:mm') || '';
  }

  ngOnInit() {
    const data = this.transactionService.currentValue;
    if (data) {
      this.valor = data.valor;
      this.destinatario = data.destinatario || '';
    }

    //  código para observar mudanças de idioma
    this.localizationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  novaTransferencia() {
    this.transactionService.clearData();
    this.router.navigate(['/money']);
  }

  //  método para tradução
  translate(key: string): string {
    return this.localizationService.translateWithLanguage(key, this.currentLanguage);
  }
}