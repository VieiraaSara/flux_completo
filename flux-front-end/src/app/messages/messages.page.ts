import { Component, OnInit } from '@angular/core';
import { MessagesService } from '../services/messages.service';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  constructor(public messagesService: MessagesService){}

  ngOnInit(): void {
    
  }
}