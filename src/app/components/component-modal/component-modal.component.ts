import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import translation from '../../../app/pt-BR.json';
import { Translation } from '../../interfaces/translation.interface';

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
  translation: Translation = translation;

  constructor(
    private router: Router, 
    private transactionService: TransactionService
  ) {}

  ngOnInit() {
    this.transactionService.currentData.subscribe(data => {
      if (data) {
        this.valor = data.valor;
        this.destinatario = data.destinatario;
      }
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
}