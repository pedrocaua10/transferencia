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
}

@Component({
  selector: 'app-component-modal',
  templateUrl: './component-modal.component.html',
  styleUrls: ['./component-modal.component.css']
})
export class ComponentModalComponent implements OnInit, OnDestroy {
  valor: number = 0;
  destinatario: string = '';
  cartoes: Cartao[] = [];
  cartaoSelecionado: Cartao | null = null;
  
  translation: Translation = translation;
  
  private cartoesSubscription: Subscription | null = null;
  private cartaoSelecionadoSubscription: Subscription | null = null;
  private dataSubscription: Subscription | null = null;

  constructor(
    private router: Router, 
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.cartoesSubscription = this.transactionService.cartoes$.subscribe(
      (cartoes: Cartao[]) => {
        this.cartoes = cartoes;
      }
    );

    this.cartaoSelecionadoSubscription = this.transactionService.cartaoSelecionado$.subscribe(
      (cartao: Cartao | null) => {
        this.cartaoSelecionado = cartao;
      }
    );

    this.dataSubscription = this.transactionService.currentData$.subscribe(data => {
      if (data) {
        this.valor = data.valor;
        this.destinatario = data.destinatario;
      }
    });
  }

  ngOnDestroy() {
    if (this.cartoesSubscription) this.cartoesSubscription.unsubscribe();
    if (this.cartaoSelecionadoSubscription) this.cartaoSelecionadoSubscription.unsubscribe();
    if (this.dataSubscription) this.dataSubscription.unsubscribe();
  }

  selecionarCartao(cartao: Cartao) {
    this.cartaoSelecionado = cartao;
    this.transactionService.setCartaoSelecionado(cartao);
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