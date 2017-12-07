(function() {
  const ASSET_PATH = './assets';

  const fetchResult = () => {
    const responsePromise = window.fetch('/result', {method: 'get'})
      .then((rawResponse) => rawResponse.json());
    return responsePromise;
  };

  const retryNewResult = () => {
    fetchResult().then((response) => {
      const {result, bonus} = response;
      setResultOnUI(result);
      setWinMessage(result);
      checkBonus(bonus);
    }).catch((err)=>{
      setMessage(err.message);
    });
  };

  const setWinMessage = (result) => {
    const [first, second, third] = result;
    const winMessageDiv = document.getElementById('win-message');
    if(first === second && second === third){
      winMessageDiv.innerHTML = 'Big Win';
    } else if(first === second || second === third || first === third){
      winMessageDiv.innerHTML = 'Small Win';
    } else {
      winMessageDiv.innerHTML = 'No Win';
    }
  };

  const setResultOnUI = (result = []) => {
    const [first, second, third] = result;
    const firstImage = document.getElementById('first-image');
    const secondImage = document.getElementById('second-image');
    const thirdImage = document.getElementById('third-image');
    firstImage.src = `${ASSET_PATH}/Symbol_${first}.png`;
    secondImage.src = `${ASSET_PATH}/Symbol_${second}.png`;
    thirdImage.src = `${ASSET_PATH}/Symbol_${third}.png`;
  };

  const checkBonus = (bonus) => {
    const retryBtn = document.getElementById('retry-button');
    if(!bonus){
      retryBtn.style['pointer-events']='auto';
      retryBtn.style.opacity = 1;
      return;
    }
    setMessage('You have a bonus !!');
    retryBtn.style['pointer-events']='none';
    retryBtn.style.opacity = 0.3;
    setTimeout(() => {
      setMessage(null);
      retryNewResult();
    }, 500); //added timeout so that we can see the result
  };

  const setMessage = (message) => {
    const messageDiv = document.getElementById('message');
    if(message){
      messageDiv.innerHTML = message;
      messageDiv.style.opacity = 1;
    }else{
      messageDiv.style.opacity = 0;
    }
  };

  document.getElementById('retry-button').addEventListener('click', retryNewResult);
})();
