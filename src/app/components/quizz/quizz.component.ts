import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { findSourceMap } from 'node:module';
import  quizz_questions  from "../../../assets/data/quizz_questions.json";

@Component({
  selector: 'app-quizz',  
  standalone: true,
  imports: [CommonModule],
  templateUrl: './quizz.component.html',
  styleUrl: './quizz.component.css'
})
export class QuizzComponent {

  title:string ='';
  questions:any;
  questionsSelect:any;

  answares:string[]=[];

  answaresSelect= {
    result: "",
    style: "",
    photo:""
  };

  questionIndex:number=0;
  MaxquestionIndex:number=0;

  finish:boolean = false;


  constructor(){}

  ngOnInit():void{
    if(quizz_questions){
      this.finish =false;
      this.title = quizz_questions.title;
      this.questions = quizz_questions.questions
      this.questionsSelect = this.questions[this.questionIndex]
      this.questionIndex = 0;
      this.MaxquestionIndex = this.questions.length
    }
  }

  playerChoose(value:string[]){
    value.forEach(element => {
      this.answares.push(element)
    });
    this.nextStep()
  }

  nextStep(){
    this.questionIndex += 1;

    if(this.MaxquestionIndex > this.questionIndex){
      this.questionsSelect = this.questions[this.questionIndex]
    }else{
      const finalAnswaer: string = this.checkResults(this.answares)
      this.finish = true
      
      quizz_questions.results.forEach(element => {
        if(element.result === finalAnswaer){
          this.answaresSelect = element
        }
      });


      // this.answaresSelect = quizz_questions.results[finalAnswaer as keyof
      // typeof quizz_questions.results.style]
    }
  }

  checkResults(anwser:string[]){
    const results = anwser.reduce((previus, current, i, arr)=>{
      if(
        arr.filter(item => item === previus).length > 
        arr.filter(item => item === current).length 
      ){
        return previus
      }else{
        return current
      }
    })
    return results
  }

  reiniciar(){
    this.questionIndex = 0;
    this.answares = [];
    this.questionsSelect = this.questions[this.questionIndex]
    this.finish = false
  }

}
