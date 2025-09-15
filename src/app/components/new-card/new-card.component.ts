import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import translation from '../../../app/pt-BR.json';
import { Translation } from '../../interfaces/translation.interface';

interface Cartao {
  id?: number;
  tipo: string;
  numero: string;
  validade: string;
  cvv: string;
  nome: string;
  imagem: string;
  final?: string;
  saldo?: number;
}

@Component({
  selector: 'app-new-card',
  templateUrl: './new-card.component.html',
  styleUrls: ['./new-card.component.css']
})
export class NewCardComponent {
  novoCartao: Cartao = {
    tipo: 'Visa',
    numero: '',
    validade: '',
    cvv: '',
    nome: '',
    imagem: 'Cartao.jpg'
  };

  translation: Translation = translation;

  constructor(
    private router: Router,
    private transactionService: TransactionService
  ) {}

  showCvvInfo(): void {
    alert('O CVV é o código de segurança de 3 dígitos (4 para American Express) localizado no verso do seu cartão.');
  }

  salvarCartao(): void {
    if (!this.novoCartao.numero || !this.novoCartao.nome || !this.novoCartao.validade || !this.novoCartao.cvv) {
      alert('Por favor, preencha todos os campos obrigatórios.');
      return;
    }

    try {
      const cartaoAdicionado = this.transactionService.adicionarCartao(this.novoCartao);
      this.transactionService.setCartaoSelecionado(cartaoAdicionado);
      this.router.navigate(['/money']);
    } catch (error) {
      console.error('Erro ao salvar cartão:', error);
      alert('Erro ao salvar cartão. Tente novamente.');
    }
  }

  cancelar(): void {
    this.router.navigate(['/money']);
  }

  formatarNumeroCartao(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    this.novoCartao.numero = value;
  }

  formatarValidade(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.novoCartao.validade = value;
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