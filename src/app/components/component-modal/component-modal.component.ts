import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { LocalizationService } from '../../services/localization.service'; 

interface Cartao {
  id: number;
  tipo: string;
  final: string;
  saldo: number;
}

@Component({
  selector: 'app-component-modal',
  templateUrl: './component-modal.component.html',
  styleUrls: ['./component-modal.component.css']
})
export class ComponentModalComponent implements OnInit {
  valor: number = 0;
  destinatario: string = '';
  cartoes: Cartao[] = [
    { id: 1, tipo: 'Mastercard', final: '6758', saldo: 2000 },
    { id: 2, tipo: 'Visa', final: '4586', saldo: 2000 },
    { id: 3, tipo: 'PayPal', final: '1234', saldo: 2000 }
  ];
  cartaoSelecionado: Cartao | null = null;
  currentLanguage: string = 'pt-BR'; 

  constructor(
    private router: Router, 
    private transactionService: TransactionService,
    private localizationService: LocalizationService 
  ) {}

  ngOnInit() {
    this.transactionService.currentData.subscribe(data => {
      if (data) {
        this.valor = data.valor;
        this.destinatario = data.destinatario;
      }
    });

    //  observar mudanças de idioma
    this.localizationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  selecionarCartao(cartao: Cartao) {
    this.cartaoSelecionado = cartao;
    this.confirmar();
  }

  voltar() {
    this.router.navigate(['/money']);
  }

  confirmar() {
    if (this.cartaoSelecionado) {
      const currentData = this.transactionService.currentValue;
      this.transactionService.updateData({
        ...currentData,
        cartao: this.cartaoSelecionado
      });
      this.router.navigate(['/confirmar']);
    }
  }

  novoCartao() {
    this.router.navigate(['/novo-cartao']);
  }

  //  método para tradução
  translate(key: string): string {
    return this.localizationService.translateWithLanguage(key, this.currentLanguage);
  }
}