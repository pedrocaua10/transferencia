import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private cartoesSubject = new BehaviorSubject<any[]>([
    { id: 1, tipo: 'Visa', final: '4536', saldo: 2000, imagem: 'Cartao.jpg' },
    { id: 2, tipo: 'Mastercard', final: '6758', saldo: 2000, imagem: 'Cartao.jpg' },
    { id: 3, tipo: 'PayPal', final: '1234', saldo: 2000, imagem: 'Cartao.jpg' }
  ]);
  public cartoes$ = this.cartoesSubject.asObservable();

  private cartaoSelecionadoSubject = new BehaviorSubject<any>(null);
  public cartaoSelecionado$ = this.cartaoSelecionadoSubject.asObservable();

  private currentDataSubject = new BehaviorSubject<any>(null);
  public currentData$ = this.currentDataSubject.asObservable();

  constructor() {}

  get cartoes(): any[] {
    return this.cartoesSubject.value;
  }

  get currentValue(): any {
    return this.currentDataSubject.value;
  }

  get cartaoSelecionado(): any {
    return this.cartaoSelecionadoSubject.value;
  }

  adicionarCartao(novoCartao: any): any {
    const cartoesAtuais = this.cartoes;
    const cartaoComId = {
      ...novoCartao,
      id: Date.now(),
      final: novoCartao.numero.slice(-4),
      saldo: 2000
    };
    
    const novosCartoes = [...cartoesAtuais, cartaoComId];
    this.cartoesSubject.next(novosCartoes);
    
    return cartaoComId;
  }

  setCartaoSelecionado(cartao: any): void {
    this.cartaoSelecionadoSubject.next(cartao);
  }

  updateData(data: any): void {
    this.currentDataSubject.next(data);
  }

  clearData(): void {
    this.currentDataSubject.next(null);
  }

  removerCartao(id: number): void {
    const novosCartoes = this.cartoes.filter(cartao => cartao.id !== id);
    this.cartoesSubject.next(novosCartoes);
  }
}