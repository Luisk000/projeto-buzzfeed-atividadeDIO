import { Component } from '@angular/core';

@Component({
  selector: 'app-quizz',
  standalone: false,
  
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {

  title = "";
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected = "";
  questionIndex = 0;
  questionMaxIndex = 0;
  finished = false;

}
