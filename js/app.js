/*クラス定義*/
class Order {
  constructor(theam,name,color,point){
    this.theam = theam;
    this.name = [name];
    this.color = color;
    this.point = [point];
  }
};
const oderR = new Order();
oderR.theam = '赤のチーム';
oderR.color = ['red'];
oderR.point = [0,0,0,0,0,];

const oderW = new Order();
oderW.theam = '白のチーム';
oderW.color = ['white'];
oderW.point = [0,0,0,0,0,];

let modal = document.getElementById('modal');

//オーダー名クリックからの登録関数
function getId(id_value){
  //モーダル表示
  modal.style.display = 'block';
  let id = id_value.id;
  let bar = String(id.match(/oder/));
  let modalBody = document.getElementById('modal-body');
  if(bar == 'oder'){
    modalBody.innerHTML = '<h2>選手名を登録してください。</h2>'+
                          '<form>'+
                          '<input id="orderInput" type="text" value="aa">'+
                          '<input id="orderRegister" type="button" value="登録">'+
                          '</form>';
    //クリック対象のオーダーidを取得
    let orderElement = document.getElementById(id);
    //クリックされた対象のvalueを取得しtextboxのvalueに指定。
    let orderInput = document.getElementById('orderInput');
    let inputValue = orderElement.getAttribute("value");
    orderInput.value = inputValue;

    //id名からナンバーだけ取り出し
    let res = id.replace(/[^0-9]/g, '');
    //登録イベントへidの要素とidナンバー部分を引数に渡す。
    orderRegistCall(orderElement,res);

  }else
    if(id == 'theams'){
      let modalBody = document.getElementById('modal-body');
      modalBody.innerHTML = '<h2>選手名を登録してください。</h2>'+
                          '<form>'+
                          '<input id="theamInput" type="text" value="">'+
                          '<input id="theamInput2" type="text" value="">'+
                          '<input id="orderRegister" type="button" value="登録">'+
                          '</form>';
    
      let theamInput = document.getElementById('theamInput');
      let theamInput2 = document.getElementById('theamInput2');
      theamInput.value = oderR.theam;
      theamInput2.value = oderW.theam;

      orderRegister.addEventListener('click', orderRegisterEvn);
      function orderRegisterEvn(){
        //valueとHtmlの書き換え
        theamRed.setAttribute("value",theamInput.value);
        theamRed.innerHTML = theamInput.value;
        theamWhite.setAttribute("value",theamInput2.value);
        theamWhite.innerHTML = theamInput2.value;
        //チームクラスに登録
        oderR.theam = theamInput.value;
        oderW.theam = theamInput2.value;
        //モーダルを閉じる
        modal.style.display = 'none';
        //イベントリスナ削除
        orderRegister.removeEventListener('click', orderRegisterEvn);
      }
    }
}


function orderRegistCall(orderElement,res){
  //テキストボックスのオーダー名に登録ボタンで書き換えイベント実行
  orderRegister.addEventListener('click', orderRegisterEvn);
  function orderRegisterEvn(){
    //valueとHtmlの書き換え
    orderElement.setAttribute("value",orderInput.value);
    orderElement.innerHTML = orderInput.value;
    //クラスnameに登録。オーダーの数によってoderRとoderWに分ける。
    if(res<5){
      oderR.name[res] = orderInput.value;
    }else{
      //オーダー数が5以上oderWにname追加
      res = res-5;
      oderW.name[res] = orderInput.value;
    }
    //モーダルを閉じる
    modal.style.display = 'none';
    //イベントリスナ削除
    orderRegister.removeEventListener('click', orderRegisterEvn);
  }
}


//閉じるボタンでモーダルを閉じる
closeBtn.addEventListener('click', function() {
  modal.style.display = 'none';
});
//ウィンドウクリックでモーダルを閉じる
window.addEventListener('click', function(e){
    if(e.target == modal){
        modal.style.display = 'none';
    }
});