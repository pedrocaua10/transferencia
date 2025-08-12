import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private transactionSource = new BehaviorSubject<any>(null);
  currentData = this.transactionSource.asObservable();

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