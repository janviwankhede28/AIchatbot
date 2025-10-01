import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbotfunction.component.html',
  styleUrls: ['./chatbotfunction.component.css']
})
export class ChatbotComponent {
  isChatOpen: boolean = false;

  messages: { sender: string, text: string }[] = [
    { sender: 'bot', text: 'Hello! I am your shopping assistant. How can I help you today?' }
  ];

  options: string[] = ['I want to buy a mobile', 'I want to buy a laptop', 'Check my order status'];
userMessage: any;

step: number = 0;

  // Show next message based on user click
  handleOption(option: string) {
    // Push user message
    this.messages.push({ sender: 'user', text: option });

    let response = '';
    let nextOptions: string[] = [];

    // Determine bot response and next options based on step
    if (this.step === 0) {
      if (option.includes('mobile')) {
        response = 'We have Samsung and iPhone. Which one do you prefer?';
        nextOptions = ['Samsung', 'iPhone'];
      } else if (option.includes('laptop')) {
        response = 'We have gaming and business laptops. Which one do you prefer?';
        nextOptions = ['Gaming', 'Business'];
      } else if (option.includes('order')) {
        response = 'Please provide your order ID to check the status.';
        nextOptions = []; // No more options
      }
    } else if (this.step === 1) {
      if (option === 'Samsung') {
        response = 'Great! Samsung phones are available in all price ranges.';
        nextOptions = ['Buy Now', 'Check Other Models'];
      } else if (option === 'iPhone') {
        response = 'iPhones are available with latest models. Do you want to buy?';
        nextOptions = ['Buy Now', 'Check Other Models'];
      } else if (option === 'Gaming') {
        response = 'Gaming laptops are powerful and fast. Want to see top models?';
        nextOptions = ['Buy Now', 'Check Other Models'];
      } else if (option === 'Business') {
        response = 'Business laptops are lightweight and efficient. Want to see top models?';
        nextOptions = ['Buy Now', 'Check Other Models'];
      } else if (option === 'Buy Now') {
        response = 'Thank you! Your order has been placed.';
        nextOptions = [];
      } else if (option === 'Check Other Models') {
        response = 'Here are other options available.';
        nextOptions = ['Option 1', 'Option 2'];
      }
    }

    this.messages.push({ sender: 'bot', text: response });

    // Update next options
    this.options = nextOptions;
    this.step += 1;
  }

  toggleChat() {
  this.isChatOpen = !this.isChatOpen;

  if (!this.isChatOpen) {
    // Chatbox is being closed, reset messages
    this.messages = [
      { sender: 'bot', text: 'Hello! I am your shopping assistant. How can I help you today?' }
    ];

    // Optional: reset options if using clickable options
    this.options = ['I want to buy a mobile', 'I want to buy a laptop', 'Check my order status'];
  this.step=0;
  }
}
 


 getBotResponse(message: string): string {
  const msg = message.toLowerCase();

  const mobileKeywords = ['mobile', 'phone', 'smartphone'];
  const laptopKeywords = ['laptop', 'notebook', 'computer'];
  const orderKeywords = ['order', 'track', 'status'];

  if (mobileKeywords.some(word => msg.includes(word))) {
    return 'We have the latest mobiles. Do you want to see Samsung or iPhone?';
  } 
  else if (laptopKeywords.some(word => msg.includes(word))) {
    return 'Great! We have gaming and business laptops. Which one do you prefer?';
  } 
  else if (orderKeywords.some(word => msg.includes(word))) {
    return 'Please provide your order ID to check the status.';
  } 
  else {
    return 'Sorry, I did not understand. Can you try again?';
  }
}
}