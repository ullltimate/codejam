const body = document.querySelector('body');
const blockWrap = document.createElement('div');
blockWrap.className = 'wrapper';
document.body.append(blockWrap);

blockWrap.innerHTML = '<div class="fieldGame"></div>'
const blockFieldGame = document.querySelector('.fieldGame');

const cellSize = 100;
const emptyCell = {
    top: 0,
    left: 0
};

const cellArray = [];
cellArray.push(emptyCell);

function move(index){
    const cell = cellArray[index];
    const leftDiff = Math.abs(emptyCell.left - cell.left);
    const topDiff = Math.abs(emptyCell.top - cell.top);
    if (leftDiff + topDiff > 1){
        return;
    }

    cell.element.style.top = `${emptyCell.top * cellSize}px`;
    cell.element.style.left = `${emptyCell.left * cellSize}px`;

    const emptyLeft = emptyCell.left;
    const emptyTop = emptyCell.top;
    emptyCell.left = cell.left;
    emptyCell.top = cell.top;
    cell.left = emptyLeft;
    cell.top = emptyTop;
}

const getNotRepeatRandomNumber = (min, max) => {
    const shuffle = (arr) => {
        let j, temp;
        for(var i = arr.length - 1; i > 0; i--){
            j = Math.floor(Math.random()*(i + 1));
            temp = arr[j];
            arr[j] = arr[i];
            arr[i] = temp;
        }
        return arr;
    }
    let array = [];
    for (let index = min; index <= max; index++) {
      array.push(index);
    }
    array = shuffle(array);
    return () => array.shift();
}
const getRandomNumber = getNotRepeatRandomNumber(1, 15);


for (var i=1; i<=15; i++){
    const cell = document.createElement('div');
    cell.className = 'cell';
    cell.id = i;
    cell.innerHTML = getRandomNumber();

    const left = i % 4;
    const top = (i - left) / 4;

    cellArray.push({
        top: top,
        left: left,
        element: cell
    });
   
    cell.style.top = `${top * cellSize}px`;
    cell.style.left = `${left * cellSize}px`;
    
    blockFieldGame.append(cell);

}
var moves = document.createElement('p');
moves.className = 'movesWrap'
blockFieldGame.before(moves);
moves.innerHTML = 'Moves: <a class = "clicks">0</a>'
var clicks = 0;
blockFieldGame.addEventListener('click', (e) => {
    e = e.target.id;
    move(e);
    clicks += 1;
    document.querySelector(".clicks").innerHTML = clicks;
});




