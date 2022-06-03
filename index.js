const container = document.querySelector('.container');
const penColorPicker = document.querySelector('#pencolor');
const backgroundColorPicker = document.querySelector('#bgcolor');
const toggleButtons = document.querySelectorAll('button.toggle');
const clearButton = document.querySelector('.clear')
const gridSizeText = document.querySelector('.grid-size-text');
const gridSizeSelector = document.querySelector('#size');

let shade = 0;
const rainbowColors  = ['rgb(148, 0, 211)', 'rgb(0, 0, 255)', 'rgb(0, 255, 0)','rgb(255, 255, 0)','rgb(255, 127, 0)','rgb(255, 0 , 0)','rgb(75, 0, 130)'];
let mode = 'default';

function createGrid(num){
   
    while (container.firstChild) {
        container.removeChild(container.firstChild);
      }
    container.style.gridTemplateColumns = `repeat(${num},1fr)`;
    container.style.gridTemplateRows = `repeat(${num},1fr)`;

    for(let i=0;i<num*num;i+=1){
        const div = document.createElement('div');
        div.classList.add('cell');
        div.style.backgroundColor=backgroundColorPicker.value;
        div.addEventListener('mouseenter',changeColor);
        container.appendChild(div);
    
    }
}

function changeColor(e){
    switch(mode){
        case 'default':
            this.style.backgroundColor = penColorPicker.value;
            break;
        case 'rainbow':
            this.style.backgroundColor = rainbowColors[Math.floor(Math.random()*rainbowColors.length)];
            break;
        case 'eraser':
            this.style.backgroundColor = backgroundColorPicker.value;
            break;
        case 'darken':
         
            let [,red,green,blue,,,] = this.style.backgroundColor.match(/rgb\((\d{1,3}), (\d{1,3}), (\d{1,3})/);
            
            red = red-25 < 0? 0:red-25;
            blue = blue-25 < 0? 0:blue-25;
            green = green-25 < 0? 0:green-25;
           
            this.style.backgroundColor = `rgb(${red}, ${green}, ${blue})`;
            break;
    }    
}

function clearGrid(){
    container.querySelectorAll('div').forEach(div=>{
        div.style.backgroundColor = backgroundColorPicker.value;
    });
}

function handleToggle(e){
    console.log(this);
    toggleButtons.forEach(button=>{
        if(button === this){
            if(!button.classList.contains('active')){
                button.classList.add('active');            
                mode = button.dataset.mode;
            }
            else{
                button.classList.remove('active');
                mode='default';
            }
        }
        else{
            if(button.classList.contains('active'))
                button.classList.remove('active');
        }     
    });
}

createGrid(gridSizeSelector.value);

backgroundColorPicker.addEventListener('input',(e)=>{
    container.querySelectorAll('div').forEach(div=>{
        div.style.backgroundColor = backgroundColorPicker.value;
    });

});

gridSizeSelector.addEventListener('input',(e)=>{
    console.log(e.target.value);
    createGrid(e.target.value);
    gridSizeText.textContent = `${e.target.value} x ${e.target.value}`;
});

toggleButtons.forEach(button=>{
    button.addEventListener('click', handleToggle)
});

clearButton.addEventListener('click',clearGrid);