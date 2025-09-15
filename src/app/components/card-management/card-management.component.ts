import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import translation from '../../../app/pt-BR.json';
import { Translation } from '../../interfaces/translation.interface';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html', 
  styleUrls: ['./card-management.component.css']
})
export class CardManagementComponent implements OnInit, OnDestroy { 
  cartaoSelecionado: any = null;
  cartoes: any[] = [];
  
  translation: Translation = translation;
  
  private cartoesSubscription: Subscription | null = null;
  private cartaoSelecionadoSubscription: Subscription | null = null;

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.cartoesSubscription = this.transactionService.cartoes$.subscribe(
      (cartoes: any[]) => {
        this.cartoes = cartoes;
      }
    );

    this.cartaoSelecionadoSubscription = this.transactionService.cartaoSelecionado$.subscribe(
      (cartao: any) => {
        this.cartaoSelecionado = cartao;
      }
    );
  }

  ngOnDestroy() {
    if (this.cartoesSubscription) this.cartoesSubscription.unsubscribe();
    if (this.cartaoSelecionadoSubscription) this.cartaoSelecionadoSubscription.unsubscribe();
  }

  selecionarCartao(cartao: any) {
    this.cartaoSelecionado = cartao;
    this.transactionService.setCartaoSelecionado(cartao);
  }

  adicionarNovoCartao() {
    this.router.navigate(['/novo-cartao']);
  }

  voltar() {
    this.router.navigate(['/money']);
  }

  confirmar() {
    if (this.cartaoSelecionado) {
      this.transactionService.setCartaoSelecionado(this.cartaoSelecionado);
      this.router.navigate(['/money']);
    }
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