import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { LocalizationService } from '../../services/localization.service';

interface Cartao {
  id: number;
  tipo: string;
  final: string;
  saldo: number;
  mostrarSaldo?: boolean;
}

@Component({
  selector: 'app-component-money',
  templateUrl: './component-money.component.html',
  styleUrls: ['./component-money.component.css']
})
export class ComponentMoneyComponent implements OnInit {
  valor: number = 0;
  destinatario: string = 'Mickey Obama Jr.';
  cartoes: Cartao[] = [
    { id: 1, tipo: 'Visa', final: '4536', saldo: 2000 },
    { id: 2, tipo: 'Mastercard', final: '6758', saldo: 2000 },
    { id: 3, tipo: 'PayPal', final: '1234', saldo: 2000 }
  ];
  cartaoSelecionado: Cartao | null = null;
  mostrarDropdown: boolean = false;
  error: string = '';
  currentLanguage: string = 'pt-BR';

  constructor(
    private router: Router, 
    private transactionService: TransactionService,
    private localizationService: LocalizationService
  ) {}

  ngOnInit() {
    if (this.cartoes.length > 0) {
      this.cartaoSelecionado = this.cartoes[0];
      this.cartoes.forEach(cartao => {
        cartao.mostrarSaldo = false;
      });
    }

    this.localizationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  toggleDropdown() {
    this.mostrarDropdown = !this.mostrarDropdown;
  }

  selecionarCartao(cartao: Cartao) {
    this.cartaoSelecionado = cartao;
    this.mostrarDropdown = false;
  }

  onAmountChange(event: any) {
    this.valor = Number(event.target.value);
  }

  onInputChange(event: any) {
    let value = event.target.value.replace(/[^0-9.]/g, '');
    
    const parts = value.split('.');
    if (parts.length > 2) {
      value = parts[0] + '.' + parts.slice(1).join('');
    }
    
    if (parts.length === 2 && parts[1].length > 2) {
      value = parts[0] + '.' + parts[1].substring(0, 2);
    }
    
    this.valor = value ? Number(value) : 0;
  }

  formatInput() {
    this.valor = Number(this.valor.toFixed(2));
  }

  selecionarValor(valor: number) {
    this.valor = valor;
  }

  toggleBalance(cartao: Cartao, event: Event) {
    event.stopPropagation();
    cartao.mostrarSaldo = !cartao.mostrarSaldo;
  }

  novoCartao() {
    this.router.navigate(['/novo-cartao']);
  }

  changeLanguage(lang: string) {
    this.localizationService.setLanguage(lang);
  }

  translate(key: string): string {
    return this.localizationService.translateWithLanguage(key, this.currentLanguage);
  }

  transferir() {
    if (!this.cartaoSelecionado) {
      this.error = 'SELECT_CARD';
      return;
    }

    if (this.valor <= 0) {
      this.error = 'SELECT_VALUE';
      return;
    }

    if (this.valor > (this.cartaoSelecionado?.saldo || 0)) {
      this.error = 'INSUFFICIENT_BALANCE';
      return;
    }

    this.transactionService.updateData({
      valor: this.valor,
      destinatario: this.destinatario,
      cartao: this.cartaoSelecionado
    });

    this.router.navigate(['/confirmar']);
  }
}