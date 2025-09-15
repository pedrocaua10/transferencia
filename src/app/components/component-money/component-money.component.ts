import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import translation from '../../../app/pt-BR.json';
import { Translation } from '../../interfaces/translation.interface';
import { Subscription } from 'rxjs';

interface Cartao {
  id: number;
  tipo: string;
  final: string;
  saldo: number;
  mostrarSaldo?: boolean;
  imagem?: string;
}

@Component({
  selector: 'app-component-money',
  templateUrl: './component-money.component.html',
  styleUrls: ['./component-money.component.css']
})
export class ComponentMoneyComponent implements OnInit, OnDestroy {
  valor: number = 0;
  destinatario: string = 'Mickey Obama Jr.';
  cartoes: Cartao[] = [];
  cartaoSelecionado: Cartao | null = null;
  mostrarDropdown: boolean = false;
  error: string = '';
  
  translation: Translation = translation;
  
  private cartoesSubscription: Subscription | null = null;
  private cartaoSelecionadoSubscription: Subscription | null = null;

  constructor(
    private router: Router, 
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.cartoesSubscription = this.transactionService.cartoes$.subscribe(
      (cartoes: Cartao[]) => {
        this.cartoes = cartoes;
        
        if (cartoes.length > 0 && !this.cartaoSelecionado) {
          this.cartaoSelecionado = cartoes[0];
          this.transactionService.setCartaoSelecionado(cartoes[0]);
        }
        
        this.cartoes.forEach(cartao => {
          cartao.mostrarSaldo = false;
        });
      }
    );

    this.cartaoSelecionadoSubscription = this.transactionService.cartaoSelecionado$.subscribe(
      (cartao: Cartao | null) => {
        if (cartao) {
          this.cartaoSelecionado = cartao;
        }
      }
    );
  }

  ngOnDestroy() {
    if (this.cartoesSubscription) this.cartoesSubscription.unsubscribe();
    if (this.cartaoSelecionadoSubscription) this.cartaoSelecionadoSubscription.unsubscribe();
  }

  toggleDropdown() {
    this.mostrarDropdown = !this.mostrarDropdown;
  }

  selecionarCartao(cartao: Cartao) {
    this.cartaoSelecionado = cartao;
    this.transactionService.setCartaoSelecionado(cartao);
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

  transferir() {
    if (!this.cartaoSelecionado) {
      this.error = 'SELECT_CARTAO';
      return;
    }

    if (this.valor <= 0) {
      this.error = 'SELECT_VALOR';
      return;
    }

    if (this.valor > (this.cartaoSelecionado?.saldo || 0)) {
      this.error = 'SALDO_INSUFICIENTE';
      return;
    }

    this.transactionService.updateData({
      valor: this.valor,
      destinatario: this.destinatario,
      cartao: this.cartaoSelecionado
    });

    this.router.navigate(['/confirmar']);
  }

  getCartaoSelecionadoTexto(): string {
    if (!this.cartaoSelecionado) {
      return this.translate('COMPONENT_MONEY.PAGAR_COM');
    }
    
    return `${this.cartaoSelecionado.tipo} ${this.translate('COMPONENT_MONEY.TERMINANDO_EM')} ${this.cartaoSelecionado.final}`;
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