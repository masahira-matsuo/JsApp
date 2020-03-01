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
oderR.theam = '愛野少年剣道部';
oderR.color = ['red'];
oderR.point = [0,0,0,0,0,];

const oderW = new Order();
oderW.theam = '島原研伸館';
oderW.color = ['white'];
oderW.point = [0,0,0,0,0,];

let modal = document.getElementById('modal');
let closeBtn = document.getElementById('closeBtn');
let orderInput = document.getElementById('orderInput');
let orderRegister = document.getElementById('orderRegister');

//オーダー名クリックからの登録関数
function getId(id_value){
  //モーダル表示
  modal.style.display = 'block';

  //クラス登録処理
  let id = id_value.id;
  //id名からナンバーだけ取り出し
  let res = id.replace(/[^0-9]/g, '');

  //クリックされた対象のvalueを取得しtextboxのvalueに指定。
  let orderName = document.getElementById(id);
  let inputValue = orderName.getAttribute("value");
  orderInput.value = inputValue;
  
  //テキストボックスのオーダー名に登録ボタンで書き換え
  orderRegister.addEventListener('click', orderRegisterEvn);
  function orderRegisterEvn(){
    console.log(orderName);
    orderName.innerHTML = orderInput.value;
    //クラスnameに登録
    if(res<5){
      oderR.name[res] = orderInput.value;
    }else{
      res = res-5;
      oderW.name[res] = orderInput.value;
   }
    console.log('オーダー１'+oderR);
    console.log('オーダー2'+oderW);
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