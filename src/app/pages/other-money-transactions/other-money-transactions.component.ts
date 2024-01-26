import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-other-money-transactions',
  standalone: true,
  imports: [ButtonModule],
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
