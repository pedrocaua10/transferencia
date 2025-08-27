import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TransactionService } from '../../services/transaction.service';
import { LocalizationService } from '../../services/localization.service'; // Adicione esta importação

@Component({
  selector: 'app-card-management',
  templateUrl: './card-management.component.html', 
  styleUrls: ['./card-management.component.css']
})
export class CardManagementComponent implements OnInit { 
  cartaoSelecionado: any = null;
  cartoes: any[] = [];
  currentLanguage: string = 'pt-BR'; // Adicione esta propriedade

  constructor(
    private router: Router,
    private transactionService: TransactionService,
    private localizationService: LocalizationService // Adicione esta injeção
  ) {}

  ngOnInit() {
    this.transactionService.cartoes$.subscribe((cartoes: any[]) => {
      this.cartoes = cartoes;
    });

    // Adicione este código para observar mudanças de idioma
    this.localizationService.currentLanguage$.subscribe(lang => {
      this.currentLanguage = lang;
    });
  }

  selecionarCartao(cartao: any) {
    this.cartaoSelecionado = cartao;
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

  // Adicione este método para tradução
  translate(key: string): string {
    return this.localizationService.translateWithLanguage(key, this.currentLanguage);
  }
}