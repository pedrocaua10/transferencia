import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import translation from '../../../app/pt-BR.json';
import { Translation } from '../../interfaces/translation.interface';

@Component({
  selector: 'app-component-modal-confirm',
  templateUrl: './component-modal-confirm.component.html',
  styleUrls: ['./component-modal-confirm.component.css']
})
export class ComponentModalConfirmComponent implements OnInit {
  dadosTransacao: any = {};
  destinatario: string = '';
  
  translation: Translation = translation;

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.dadosTransacao = this.transactionService.currentValue || {};
    this.destinatario = this.dadosTransacao.destinatario || '';
  }

  voltar() {
    this.router.navigate(['/money']);
  }

  confirmar() {
    this.router.navigate(['/sucesso']);
  }

  translate(key: string): string {
    const keys = key.split('.');
    let value: any = this.translation;
    
    for (const k of keys) {
      if (!value) return key;
      value = value[k];
    }
    
    return value || key;
  }
}