import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { LocalizationService } from '../../services/localization.service';

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

  currentLanguage: string = 'pt-BR';

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private localizationService: LocalizationService
  ) {
    this.localizationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  showCvvInfo(): void {
    if (this.currentLanguage === 'pt-BR') {
      alert('O CVV é o código de segurança de 3 dígitos (4 para American Express) localizado no verso do seu cartão.');
    } else {
      alert('CVV is the 3-digit security code (4 for American Express) located on the back of your card.');
    }
  }

  salvarCartao(): void {
    // Validação básica
    if (!this.novoCartao.numero || !this.novoCartao.nome || !this.novoCartao.validade || !this.novoCartao.cvv) {
      if (this.currentLanguage === 'pt-BR') {
        alert('Por favor, preencha todos os campos obrigatórios.');
      } else {
        alert('Please fill in all required fields.');
      }
      return;
    }

    if (this.novoCartao.numero) {
      this.novoCartao.final = this.novoCartao.numero.slice(-4);
    }
    
    this.novoCartao.id = Date.now();
    this.novoCartao.saldo = 2000;

    try {
      const cartaoAdicionado = this.transactionService.adicionarCartao(this.novoCartao);
      this.transactionService.setCartaoSelecionado(cartaoAdicionado);
      this.router.navigate(['/money']);
    } catch (error) {
      console.error('Erro ao salvar cartão:', error);
      if (this.currentLanguage === 'pt-BR') {
        alert('Erro ao salvar cartão. Tente novamente.');
      } else {
        alert('Error saving card. Please try again.');
      }
    }
  }

  cancelar(): void {
    this.router.navigate(['/money']);
  }

  // Método para formatar número do cartão
  formatarNumeroCartao(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    value = value.replace(/(\d{4})/g, '$1 ').trim();
    this.novoCartao.numero = value;
  }

  // Método para formatar validade
  formatarValidade(event: any): void {
    let value = event.target.value.replace(/\D/g, '');
    if (value.length > 2) {
      value = value.substring(0, 2) + '/' + value.substring(2, 4);
    }
    this.novoCartao.validade = value;
  }

  // Método para tradução
  translate(key: string): string {
    return this.localizationService.translateWithLanguage(key, this.currentLanguage);
  }
}