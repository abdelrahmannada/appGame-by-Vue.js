new Vue({
  el: "#app",
  data: {
    playerHealth : 100, 
    monsterHealth : 100,
    gameIsRunning : false,
    turns : [],
  },
  methods : {
    startGame: function (){
      console.log('run startGame');
      this.gameIsRunning = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    attack:function (){
      damage = this.calculateDamage(3,10)
      this.monsterHealth -= damage ;
      this.turns.unshift({
        isPlayer : true,
        text : 'Player Hits Monster For ' + damage
      })
      
      if (this.checkWin()){
        return; 
      }
      this.monsterAttack()
    },
    specialAttack:function (){
      console.log('run specialAttack');
      var  damage = this.calculateDamage(10,20)
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer : true,
        text : 'Player Hits Monster hard For ' + damage
      });
      if (this.checkWin()){
        return; 
      }
      this.monsterAttack()

    },
    heal: function (){
      if(this.playerHealth <= 90){
        this.playerHealth += 15;
      } else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer : true,
        text : 'Player Heals for 10 ' 
      });
      
      this.monsterAttack ()
    },
    giveUp: function(){
      console.log('run giveUp');
      this.gameIsRunning = false ;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
    },
    monsterAttack : function(){
      var damage = this.calculateDamage(5,12);
      this.playerHealth -= damage ;
      this.checkWin();
      this.turns.unshift({
        isPlayer : false,
        text : 'Monster Hits Player For' + damage
      })
    },
    calculateDamage: function (max,min){
      return Math.max(Math.floor(Math.random()* max) + 1 , min) ;
    },
    checkWin: function() {
      if (this.monsterHealth <= 0 ){
          if(confirm('You Won! New Game?')){
            this.startGame();
          } else {
            this.gameIsRunning = false;
          }
        return true;
      } else if (this.playerHealth <= 0 ){
        if(confirm('You Lost! New Game?')){
          this.startGame();
        } else {
          this.gameIsRunning = false;
        }
        return true;
      }
      return false;
    }



  },
});