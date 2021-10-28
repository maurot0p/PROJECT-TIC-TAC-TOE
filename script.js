const gameBoard = (() => {
  let score=[]; 
  const updateBoard = (player,spot) => {
       score[spot]=player;
       for(var i=0;i<9;i++){
        if(score[i]!=null){
          selection[i].innerHTML=score[i]; //this updates the grid
        }
      }
  }
  const emptyBoard = () => {
      score=[]; //empties the array
  }
  const getBoard = () => {
    return score;
  }
  return {updateBoard,emptyBoard,getBoard};
})();
  const player = (playerX) => {
    return {playerX};
  }
  const game = () => {
    const player1 = player('&times');
    const player2 = player('o');
    let i=0;
    const playGame = () => {
      restartbutton.addEventListener('click', () => {
        i=0;
        myGame.restartGame();
      });
      squares.forEach((button) => {
        button.addEventListener('click', () => {
          if(selection[button.id].innerHTML==''){
            if(i%2==0){
              selection[button.id].style.color="red";
              turn.innerHTML="Player " +player2.playerX+"'s turn"
              gameBoard.updateBoard(player1.playerX,button.id); //button id is equal to the array spot
              i++;
            }          
            else{
              selection[button.id].style.color="blue";

              turn.innerHTML="Player " +player1.playerX+"'s turn"
              gameBoard.updateBoard(player2.playerX,button.id); //button id is equal to the array spot
              i++;
            }
          }
          if(i==9 && checkWinner(gameBoard.getBoard())==false){
            i=0;
            declareWinner("tie");
          }
          else if(checkWinner(gameBoard.getBoard())==true){
            i=0;
            declareWinner(result);
          }
        });
      });
    }
    const declareWinner= async (winner) => {  
      if(winner=="tie"){
        turn.innerHTML="It's a tie!";
        await delay(1000);
        restartGame();
      }
      else if(winner=='&times'){
        turn.innerHTML="Player &times wins!";
        await delay(1000);
        restartGame();
      }
      else{
        turn.innerHTML="Player o wins!";
        await delay(1000);
        restartGame();
      }
    }
    const restartGame = () => {
      for(var i=0;i<9;i++){
      selection[i].innerHTML='';
      }
      gameBoard.emptyBoard();
    }
    return {playGame,restartGame,declareWinner};         
  }

  function checkWinner(gameBoard){ 
  if(gameBoard[0]!=null && gameBoard[0]==gameBoard[1] && gameBoard[1]==gameBoard[2]){ //first row
    result=gameBoard[0];
    return true;
  }
  if(gameBoard[3]!=null && gameBoard[3]==gameBoard[4] && gameBoard[4]==gameBoard[5]) { //second row
    result=gameBoard[3];
    return true;
  }
  if(gameBoard[6]!=null && gameBoard[6]==gameBoard[7] && gameBoard[7]==gameBoard[8]) { //third row
    result=gameBoard[6];
    return true;
  }
  if(gameBoard[0]!=null && gameBoard[0]==gameBoard[3] && gameBoard[3]==gameBoard[6]) { //first  column
    result=gameBoard[0];
    return true;
  }
  if(gameBoard[1]!=null && gameBoard[1]==gameBoard[4] && gameBoard[4]==gameBoard[7]) { //second  column
    result=gameBoard[1];
    return true;
  }
  if(gameBoard[2]!=null && gameBoard[2]==gameBoard[5] && gameBoard[5]==gameBoard[8]) { //third  column
    result=gameBoard[2];
    return true;
  }
  if(gameBoard[0]!=null && gameBoard[0]==gameBoard[4] && gameBoard[4]==gameBoard[8]) { //first   diagonal
    result=gameBoard[0];
    return true;
  }
  if(gameBoard[2]!=null && gameBoard[2]==gameBoard[4] && gameBoard[4]==gameBoard[6]) { //second  diagonal
    result=gameBoard[2];
    return true;
  }
return false;
}
  let result= "";
  const delay = ms => new Promise(res => setTimeout(res, ms));
  const winner=document.querySelector('#winner');
  const turn=document.querySelector('#turns');
  const squares=document.querySelectorAll('.square');
  const squarecontainer=document.querySelector('#squarecontainer');
  const selection=document.querySelectorAll('.selection');
  const container=document.querySelector('#container');
  const restartbutton=document.querySelector('#restart');
  const myGame=game();
  myGame.playGame();
 

