import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-other-money-transactions',
  standalone: true,
  imports: [CommonModule, ButtonModule],
  templateUrl: './other-money-transactions.component.html',
  styleUrls: ['./other-money-transactions.component.scss']
})
export class OtherMoneyTransactionsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }
  onCreate() {

  }

}
