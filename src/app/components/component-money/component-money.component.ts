import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';

@Component({
  selector: 'app-component-money',
  templateUrl: './component-money.component.html',
  styleUrls: ['./component-money.component.css']
})
export class ComponentMoneyComponent {
  valorTransferencia: string = '';
  mostrarDropdown = false;
  mostrarSaldo = false;
  errorMessage: string = '';
  
  cartoes = [
    { 
      id: 1, 
      tipo: 'Visa', 
      final: '4586', 
      saldo: 2000.00,
      limite: 5000.00,
      imagem: 'Cartao.jpg'
    },
    { 
      id: 2, 
      tipo: 'Mastercard', 
      final: '6758', 
      saldo: 2000.00,
      limite: 5000.00,
      imagem: 'Cartao.jpg'
    },
    {
    id:3,
    tipo: 'Paypal', 
    final: '1234', 
    saldo: 2000.00,
    limite: 5000.00,
    imagem: 'Cartao.jpg'
    }
  ];
  
  cartaoSelecionado = this.cartoes[0];
  valoresRapidos = [100, 200, 300];
  destinatario = "Mickey Obama Jr.";

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  alternarDropdown(event: Event) {
    event.stopPropagation();
    this.mostrarDropdown = !this.mostrarDropdown;
    this.errorMessage = '';
  }

  selecionarCartao(cartao: any, event: Event) {
    event.stopPropagation();
    this.cartaoSelecionado = cartao;
    this.mostrarDropdown = false;
    this.errorMessage = '';
  }

  alternarSaldo(event: Event) {
    event.stopPropagation();
    this.mostrarSaldo = !this.mostrarSaldo;
    this.errorMessage = '';
  }

  selecionarValorRapido(valor: number) {
    this.valorTransferencia = valor.toFixed(2).replace('.', ',');
    this.errorMessage = '';
  }

  formatarValor(value: string) {
    let numericValue = value.replace(/\D/g, '');
    this.valorTransferencia = (Number(numericValue)/100).toFixed(2).replace('.', ',');
    this.errorMessage = '';
  }

  transferir() {
    const valorNumerico = this.getValorNumerico();
    
    if (valorNumerico <= 0) {
      this.errorMessage = 'Adicione um valor maior que 0';
      return;
    }
    
    if (!this.transactionService.validateBalance(valorNumerico, this.cartaoSelecionado.id)) {
      this.errorMessage = 'Saldo insuficiente para esta transação';
      return;
    }

    this.transactionService.updateData({
      valor: valorNumerico,
      valorFormatado: this.valorTransferencia,
      cartao: this.cartaoSelecionado,
      destinatario: this.destinatario
    });
    this.router.navigate(['/cartao']);
  }

  getValorNumerico(): number {
    return parseFloat(this.valorTransferencia.replace(',', '.')) || 0;
  }

  @HostListener('document:click', ['$event'])
  fecharDropdown(event: Event) {
    if (!(event.target as HTMLElement).closest('.card-selector')) {
      this.mostrarDropdown = false;
    }
  }
}