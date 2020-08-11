import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  providers:[AuthService]
})
export class HeaderComponent implements OnInit {
  
  constructor(public authService: AuthService) { 
    
  }

  ngOnInit(): void {
    console.log('en el header');
  }

}
