   document.addEventListener('keydown',function(e){
    const audio = document.querySelector(`audio[data-key="${e.keyCode}"]`);
    const key = document.querySelector(`div[data-key="${e.keyCode}"]`);
    if(!audio) return;
    audio.currentTime = 0; 
    audio.play();
    key.classList.add('playing');
  }
);

document.querySelectorAll('.key').forEach(key => 
  key.addEventListener('transitionend', function(e){
    if(e.propertyName !== 'transform'){
      key.classList.remove('playing');
      return;
    }
  })
);

