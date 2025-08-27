import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { LocalizationService } from '../../services/localization.service'; 

@Component({
  selector: 'app-component-modal-confirm',
  templateUrl: './component-modal-confirm.component.html',
  styleUrls: ['./component-modal-confirm.component.css']
})
export class ComponentModalConfirmComponent implements OnInit {
  dadosTransacao: any = {};
  destinatario: string = '';
  currentLanguage: string = 'pt-BR';
  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private localizationService: LocalizationService 
  ) {}

  ngOnInit() {
    this.dadosTransacao = this.transactionService.currentValue || {};
    this.destinatario = this.dadosTransacao.destinatario || '';

    //código para observar mudanças de idioma
    this.localizationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  voltar() {
    this.router.navigate(['/money']);
  }

  confirmar() {
    this.router.navigate(['/sucesso']);
  }

  //método para tradução
  translate(key: string): string {
    return this.localizationService.translateWithLanguage(key, this.currentLanguage);
  }
}