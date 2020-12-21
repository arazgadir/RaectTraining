import React, { Component } from "react";

import { StyleSheet, Text, View,TouchableOpacity,} from "react-native";


export default class App extends Component {



constructor(props) {
      super(props)
      this.state = {
        firstScreen: "",
        secondScreen: ""
      }
        this.operations = ['DEL', '+', '-', '*', '/']
 }


 dotBlock = false;
 


 getResult(){
        
         const text = this.state.firstScreen
         console.log(text, eval(text))
        
         if (eval(text) !== Infinity  && eval(text) !== -Infinity ){

          this.setState({
            secondScreen: eval(text)
            })
          }
           else {
             this.setState({secondScreen: 'division by zero. press C'})

             
           }

        
        
        //this.setState({
        //secondScreen: eval(text)
        //})
 }

     


getValidate(){

         const text = this.state.firstScreen
         switch(text.slice(-1)){
           case '+':
            case '-':
               case '*':
                 case '/':
                   
                   return false
         }
         return true
 }




allClear(){
       this.setState({
         secondScreen: '',
         firstScreen: ''
         })
          this.dotBlock = false
}






 

getButtonPress(text){
console.log(text)

        switch (text){
          case 'C':  return  this.allClear()
          case '=':  return this.getValidate() && this.getResult()
          case '%':   text = '/100'
          case '.':  if(!this.dotBlock){
                     this.dotBlock = true
                     console.log(text)
                     this.setState({
                     firstScreen: this.state.firstScreen+text
                     })
                     
                     }
                   
          
        } 
                     
   
  

         if (this.dotBlock === false && text === '.' ){
             this.setState({
               firstScreen: this.state.firstScreen+text
               })
               }
         else if(text !== '.'){
             this.setState({
               firstScreen: this.state.firstScreen+text
               })
               }
}




getOpPress(op) {
console.log(op)

        if(this.state.firstScreen == "" ){
           switch(op) {
           case '+' : 
           case '*' :
           case '/' : return false;
           }
           }


           
        switch(op) {
            case 'DEL':
                console.log(this.state.firstScreen)
                let text = this.state.firstScreen.split('')
                let block = text.pop()
                if ( block === '.'){
                    this.dotBlock = false
                    }
                
                    this.setState({
                    firstScreen: text.join('')
                    })
          
                break
            case '+':
            case '-':
            case '*':
            case '/':
              
                  this.dotBlock = false;
                  this.nullBlock = false;
                  this.percentBlock = true;

                  const lastChar = this.state.firstScreen.split('').pop()
        
                  if(this.operations.indexOf(lastChar) > 0) return
        
                    if(this.state.text == "" ) return 
                       this.setState({
                       firstScreen: this.state.firstScreen + op
                       })

      }
}



    render() {


      let rows = []
      let nums = [['C', '%', ''], [7, 8, 9], [4, 5, 6], [1, 2, 3], ['.', 0, '=']]
      
      for (let i = 0; i < 5; i++){
           let row = []

      for (let j = 0; j < 3; j++ ){
          
        row.push(
          <TouchableOpacity  key={nums[i][j]} onPress={() => this.getButtonPress(nums[i][j])} style={styles.btn}>
            
          <Text style={styles.btntext}>{nums[i] [j]}</Text>
          </TouchableOpacity>

          )
        }
        rows.push(<View key={i}  style={styles.row}>{row}</View>)
      }



      let ops = []
      for(let i=0; i < 5 ; i++){
        
        ops.push(
          <TouchableOpacity key={this.operations[i]} onPress={() => this.getOpPress(this.operations[i])}  style={styles.btn}>
          <Text style={[styles.btntext, styles.white]}>{this.operations[i]}</Text>
          </TouchableOpacity>)
      }



        return (
            <View style={styles.container}>

                <View style={styles.result}>
                  <Text style={styles.firstScreen}>{this.state.firstScreen}</Text>
                </View>

                <View style={styles.calculation}>
                  <Text style={styles.secondScreen}>{this.state.secondScreen}</Text>
                </View>

                <View style={styles.buttons}>
                  
                    <View style={styles.numbers}>
                    {rows}
                    </View>

                    <View style={styles.operations}>
                    {ops}
                    </View>

                </View>

            </View>
        );
    }
}



const styles = StyleSheet.create ({

container: {
 flex: 1
},

btn: {
  flex: 1,
  alignItems: 'center',
  alignSelf: 'stretch',
  justifyContent: 'center' 
},

secondScreen: {
  fontSize: 50,
  color: '#000000'
},

firstScreen: {
  fontFamily: 'monospace',
  fontSize: 45,
  color: '#ffa600'
},

btntext: {
  fontFamily: 'monospace',
fontSize: 33,
},

white: {
color: '#4d4d4d'
},

row: {
flexDirection: 'row',
flex: 1,
justifyContent: 'space-around',
alignItems: 'center',
},

result: {
  flex: 2,
  backgroundColor: '#333333',
  justifyContent: 'center',
  alignItems: 'flex-end'
  
},

calculation: {
flex: 1.5,
backgroundColor: '#595959',
justifyContent: 'center',
alignItems: 'flex-end'


},
buttons: {
  flex: 5,
  flexDirection: 'row'
},

numbers: {
  flex: 3,
  backgroundColor: 'grey'
},

operations: {
  flex: 1,
  justifyContent: 'space-around',
  alignItems: 'stretch',
  backgroundColor: '#ffa600'
}


})