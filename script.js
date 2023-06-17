let btnStart = document.querySelectorAll('.btn-start');
let banner = document.querySelector('.wrapper__banner');
let gameContainer = document.querySelector('.wrapper__game');
let modalBtn = document.querySelector('.modal-btn');
let modalClose = document.querySelector('.modal-close');
let modalWindonw = document.querySelector('.modal-window');

let player = new Audio();
player.volume = .4;
let failSound = 'media/fail.mp3';


function playSound(sound) {
player.src = sound;
player.play();
}

btnStart.forEach(btn=>{
  btn.addEventListener('click', function(){
    banner.classList.add('active');
    if(modalWindonw.classList.contains('active')) modalWindonw.classList.remove('active');
    startGame();
  }); 
});

modalBtn.addEventListener('click', function(e){
  modalWindonw.classList.add('active');
});

modalClose.addEventListener('click', function(){
  modalWindonw.classList.remove('active');
});

let state = {}

function startGame() {
  state = {}
  makeMove(1)
}

function makeMove(id){
    const textNode = textNodes.find(textNode => textNode.id === id);
     newNode(textNode);
}



function newNode(node){
    let game = document.querySelector('.game');
    if(game){
        game.classList.add('last');
    }
    setTimeout(()=>{
        gameContainer.innerHTML= '';
    }, 300)
    

    let newGame = document.createElement('div');
    newGame.className='game';
    let newTitle = document.createElement('h2');
    newTitle.className='game__title';
    newTitle.textContent = `Хід ${node.count}`;
    let newText = document.createElement('h3');
    newText.className = 'game__text';
    newText.textContent = node.text;
    let newOptions = document.createElement('div');
    newOptions.className = 'game__grid';
   

    node.options.forEach(option => {
        if(showOption(option)){
          let btn = document.createElement('button');
          btn.classList.add('game__option');
          btn.textContent = option.text; 
          btn.addEventListener('click', () => selectOption(option));
          newOptions.append(btn);
        }
       
    });
    newGame.append(newTitle);
    if(node.img){
        let img = document.createElement('img');
        img.classList.add('game__img');
        img.src=node.img;
        newGame.append(img);
    } 
    
    newGame.append(newText);
    if(node.video){
      let video = document.createElement('video');
      video.classList.add('game__video');
      video.src = node.video;
      video.autoplay = true;
      video.loop = true;
      newGame.append(video);
    }
    newGame.append(newOptions);

    setTimeout(()=>{
        gameContainer.append(newGame);
    }, 450)
    setTimeout(()=>{
        newGame.classList.add('active');
    }, 800)

}

function selectOption(option){
    let id = option.nextText;
    if(id==-4){
      setTimeout(()=>{
        gameContainer.innerHTML= '';
      }, 200);
      banner.classList.remove('active');
      
    } else{
      state = Object.assign(state, option.setState)
    if(id<0) {
      playSound(failSound);
      state = {};
    } 
    makeMove(id);
    }
    
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(state)
}

const textNodes = [
    {
      id: 1,
      count: 'Перший',
      text: 'Ти народився. Твоє перше слово',
      img: 'media/01.jpg',
      options: [
        {
          text: 'Математика',
          nextText: 2
        },
        {
          text: 'Пиво',
          nextText: 2
        },
        {
            text: 'Аніме',
            nextText: 2
          },
          {
            text: 'Соєва олія',
            nextText: 2
          },
      ]
    },
    {
      id: 2,
      count: 'Другий',
      text: 'Ну, там усі відповіді були правильні. Тепер буде серйозно. Хто ти?',
      options: [
        {
          text: 'Алкаш',
          nextText: -1
        },
        {
          text: 'Математик',
          nextText: 3
        },
        {
          text: 'Емо-анімешник',
          nextText: -1
        }
      ]
    },
    {
      id: -1,
      count: 'Завершився...',
      text: 'Це, звісно, так, але ще не на цьому життєвому етапі',
      img: 'media/03.jpg',
      options: [
        {
          text: 'Почати Знову',
          nextText: 1,
        },
      ]
    },
    {
      id: 3,
      count: 'Третій',
      text: 'Тобі сказали привітати вчительку музики та вручити їй подарунок. Вона відмовляється. Ти',
      options: [
        {
          text: 'Ну, ні то ні. Мені більше дістанеться',
          nextText: 4
        },
        {
          text: 'Візьміть, будь ласка, Надіє Михайлівно. Ми вас дуже любимо',
          nextText: -2
        }
      ]
    },
    {
      id: -2,
      count: 'Завершився',
      text: 'Ти - не Антон. Іди звідси',
      img: 'media/03.jpg',
      options: [
        {
          text: 'Почати знову (краще вже ні)',
          nextText: 1
        }
      ]
    },
    {
      id: 4,
      count: 'Четвертий',
      text: 'Тобі пропонують навчитися пити пиво. А ще безкоштовно пригощають.',
      options: [
        {
          text: 'Відмовляюся',
          nextText: 5
        },
        {
          text: 'Від такого не відмовляються',
          setState: { beer: true },
          nextText: 5
        }
      ]
    },
    {
      id: 5,
      count: "П'ятий",
      text: 'Ти вирішив більше дізнатися про життя звичайних людей. Для цього ти',
      options: [
        {
          text: 'Почну дивитися аніме',
          nextText: 6
        },
        {
          text: 'Стану баскетболістом',
          nextText: -2
        },
        {
          text: 'Заведу інстаграм',
          nextText: -2
        },
      ]
    },
    {
      id: 6,
      count: "Шостий",
      text: "Ти зустрів філософа. Без пива з ним не порозумітися і не зав'язати дружби.",
      img: 'media/02.jpg',
      options: [
        { requiredState: (currentState) => !currentState.beer,
          text: 'Але я лох. Забув пиво з четвертого ходу... Піду дивитися аніме і повернуся на четвертий хід за "Опіллям"',
          nextText: 4
        },
        {
          text: 'Не дуже і хотілося. Піду собі далі.',
          nextText: -3
        },
        {
          requiredState: (currentState) => currentState.beer,
          text: 'Добре, що я не лох і не забув пиво з четвертого ходу. Піду порозмовляю з хорошою людиною.',
          nextText: 7
        },
      ]
    },
    {
      id: -3,
      count: 'Завершився',
      text: 'Виявилося, що ти все одно спився. Просто вже без таких хороших людей',
      img: 'media/03.jpg',
      options: [
        {
          text: 'Спитися, померти й почати спочатку',
          nextText: 1
        }
      ]
    },
    {
      id: 7,
      count: "Сьомий",
      text: 'Ти став другом для філософа',
      options: [
        {
          text: 'Юху, це все, що я хотів від життя. Закінчити гру',
          nextText: 1
        },
        {
          text: "Круто, піду вип'ю ще трішечки",
          nextText: 4
        },
        {
          text: "П'янка - не головне (ну майже). Треба жити далі ",
          nextText: 8
        },
      ]
    },
    {
      id: 8,
      count: "Фінальний",
      text: 'Життя не закінчилося, але вибір невеликий',
      options: [
        {
          text: 'Жити довго та щасливо, а потім потрапити в рай. Хочу приз',
          nextText: 10
        }
      ]
    },
    {
      id: 10,
      count: "Призовий",
      text: 'Обіцяний приз',
      video: 'media/video_2023-06-13_22-06-01.mp4',
      options: [
        {
          text: 'Закінчити гру',
          nextText: -4
        }
      ]
    }
  ]