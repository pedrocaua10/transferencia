import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionSource = new BehaviorSubject<any>(null);
  currentData = this.transactionSource.asObservable();

  private cartoesSubject = new BehaviorSubject<any[]>([]);
  cartoes$ = this.cartoesSubject.asObservable();

  private cartaoSelecionado: any = null;

 adicionarCartao(cartao: any): any {
  // Garante que o cartão tenha id e saldo
  if (!cartao.id) cartao.id = Date.now();
  if (typeof cartao.saldo !== 'number') cartao.saldo = 2000;

  const current = this.cartoesSubject.value;
  this.cartoesSubject.next([...current, cartao]);
  return cartao;
}


  setCartaoSelecionado(cartao: any): void {
    this.cartaoSelecionado = cartao;
  }

  getCartaoSelecionado(): any {
    return this.cartaoSelecionado;
  }

  get currentValue() {
    return this.transactionSource.value;
  }

  updateData(data: any) {
    this.transactionSource.next(data);
  }

  clearData() {
    this.transactionSource.next(null);
  }

  validateBalance(valor: number, cartaoId: number): boolean {
    const cartoes = [
      { id: 1, saldo: 2000 },
      { id: 2, saldo: 2000 }
    ];
    
    const cartao = cartoes.find(c => c.id === cartaoId);
    return cartao ? cartao.saldo >= valor : false;
  }
}