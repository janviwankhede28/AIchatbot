import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatbotComponent } from './chatbotfunction/chatbotfunction.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,ChatbotComponent],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'chatbot';
}
