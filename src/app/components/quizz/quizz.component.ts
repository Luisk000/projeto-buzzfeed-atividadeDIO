import { Component, OnInit } from '@angular/core';
import quizz_questions from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',
  standalone: false,
  
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent implements OnInit{

  title = "";
  questions: any;
  questionSelected: any;
  answers: string[] = [];
  answerSelected = "";
  questionIndex = 0;
  questionMaxIndex = 0;
  finished = false;

  ngOnInit() {
    if (quizz_questions){
      this.finished = false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions;
      this.questionSelected = this.questions[this.questionIndex];
      this.questionIndex = 0;
      this.questionMaxIndex = this.questions.length;
    }   
  }

  playerChoose(value: string){
    this.answers.push(value);
    this.nextStep();
  }

  async nextStep(){
    this.questionIndex += 1;
    if (this.questionMaxIndex > this.questionIndex) 
      this.questionSelected = this.questions[this.questionIndex]   
    else {
      const finalAnswer: string = await this.checkResult(this.answers);
      this.finished = true 
      this.answerSelected = quizz_questions.results[
        finalAnswer as keyof typeof quizz_questions.results];
    }
  }

  async checkResult(answers: string[]){
    const result = answers.reduce((previous, current, i, array) => {
      if (array.filter(item => item === previous).length >
          array.filter(item => item === current).length)
        return previous;
      else if (array.filter(item => item === previous).length ===
          array.filter(item => item === current).length)
        return "C";
      else
        return current;
    })
    return result;
  }

  reiniciar(){
    this.finished = false;
    this.questionIndex = 0;
    this.questionSelected = this.questions[this.questionIndex];
  }

}
