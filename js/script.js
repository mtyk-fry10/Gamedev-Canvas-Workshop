   // canvas要素に映像を描写
   var canvas = document.getElementById("myCanvas");
   // 2D描画コンテキストを変数に代入
   var ctx = canvas.getContext("2d");

   // 描写される円の半径
   var ballRadius = 10;
   // ボールを動かす為の変数を定義
   var x = canvas.width / 2; // ボールの開始位置のx軸
   var y = canvas.height - 30; // ボールの開始位置のy軸
   var dx = 2; // ボールの移動用のx軸
   var dy = -2; // ボールの移動用のy軸

   // ボールに当てるパドルを変数で定義
   var paddleHeight = 10; // パドルの高さ
   var paddleWidth = 75; // パドルの幅
   var paddleX = (canvas.width - paddleWidth) / 2; // パドルの開始地点

   // パドルの操作用の変数
   var rightPressed = false; // 右ボタン
   var leftPressed = false; // 左ボタン

   // ブロック変数を定義
   var brickRowCount = 3; // ブロックの行の数
   var brickColumnCount = 5; // ブロックの列の数
   var brickWidth = 75; // ブロックの幅
   var brickHeight = 20; // ブロックの高さ
   var brickPadding = 10; // ブロックの隙間
   var brickOffsetTop = 30; // キャンバスの上辺との隙間
   var brickOffsetLeft = 30; // キャンバスの左辺との隙間

   // ブロックの配列を定義
   var bricks = [];
   for (var c = 0; c < brickColumnCount; c++) {
       // ブロックの列の数まで繰り返す
       // ブロックの列の数だけの要素を代入する
       bricks[c] = [];
       for (var r = 0; r < brickRowCount; r++) {
           // ブロックの行の数まで繰り返す
           // 2次元配列はブロックの行と列の要素を含む
           // 行はブロックが描写されるx, y座標のオブジェクトを含む
           // statusプロパティ (0はパッシブ,1はアクティブ)
           bricks[c][r] = { x: 0, y: 0, status: 1 };
       }
   }

   // ボタン用のイベントリスナー
   document.addEventListener("keydown", keyDownHandler, false); // 押した時
   document.addEventListener("keyup", keyUpHandler, false); // 離した時

   /**
    * キーが押された時に呼ばれるメソッド
    * 引数: e
    **/
   function keyDownHandler(e) {

       if (e.key == "Right" || e.key == "ArrowRight") {
           // 右のキーが押された時の処理
           rightPressed = true;
       } else if (e.key == "Left" || e.key == "ArrowLeft") {
           // 左のキーが押された時の処理
           leftPressed = true;
       }
   }

   /**
    * キーが離された時に呼ばれるメソッド
    * 引数: e
    **/
   function keyUpHandler(e) {

       if (e.key == "Right" || e.key == "ArrowRight") {
           // 右のキーが離された時の処理
           rightPressed = false;
       } else if (e.key == "Left" || e.key == "ArrowLeft") {
           // 左のキーが離された時の処理
           leftPressed = false;
       }
   }

   /**
    * 衝突検出関数
    * 引数: なし
    **/
   function collisionDetection() {
       for (var c = 0; c < brickColumnCount; c++) {
           for (var r = 0; r < brickRowCount; r++) {
               // 衝突検出のループの中でブロックオブジェクトを保存する変数bを定義
               var b = bricks[c][r];
               if (b.status == 1) {
                   // ブロックに衝突した場合
                   if (x > b.x && x < b.x + brickWidth && y > b.y && y < b.y + brickHeight) {
                       // 全ての条件に一致した場合

                       // ボールのx座標がブロックのx座標より大きい
                       // ボールのx座標がブロックのx座標とその幅の和より小さい
                       // ボールのy座標がブロックのy座標より大きい
                       // ボールのy座標がブロックのy座標とその高さの和より小さい
                       dy = -dy;
                       // ブロックのstatusプロパティを0にする
                       b.status = 0; // ブロックを消す
                   }
               }
           }
       }
   }

   /**
    * ボールを描写するメソッド
    * 引数: なし 
    **/
   function drawBall() {

       // ボールを描写する
       ctx.beginPath();
       // ボールの大きさを定義
       ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
       // ボールの色を定義
       ctx.fillStyle = "#0095DD";
       // ボールの内部領域を塗りつぶす
       ctx.fill();
       // ボールの描写完了
       ctx.closePath();
   }

   /**
    * パドルを画面上に表示するメソッド
    * 引数: なし
    **/
   function drawPaddle() {

       // パドルを描写する
       ctx.beginPath();
       // パドルの大きさを定義
       ctx.rect(paddleX, canvas.height - paddleHeight, paddleWidth, paddleHeight);
       // パドルの色を定義
       ctx.fillStyle = "#0095DD";
       // パドルの内部領域を塗りつぶす
       ctx.fill();
       // パドルの描写完了
       ctx.closePath();
   }

   /**
    * ブロックを作成するメソッド
    * 引数: なし
    **/
   function drawBricks() {
       for (var c = 0; c < brickColumnCount; c++) {
           // ブロックの列の数だけ繰り返す
           for (var r = 0; r < brickRowCount; r++) {
               // ブロックの行の数だけ繰り返す
               if (bricks[c][r].status == 1) {
                   // ブロックのstatusプロパティが1の場合に実行
                   var brickX = (c * (brickWidth + brickPadding)) + brickOffsetLeft;
                   var brickY = (r * (brickHeight + brickPadding)) + brickOffsetTop;
                   // ブロックの配列の要素にx軸, y軸を代入
                   bricks[c][r].x = brickX;
                   bricks[c][r].y = brickY;
                   // ブロックを描写する
                   ctx.beginPath();
                   // ブロックのx, y座標と横幅と高さを指定
                   ctx.rect(brickX, brickY, brickWidth, brickHeight);
                   // ブロックの色を定義
                   ctx.fillStyle = "#0095DD";
                   // ブロックの内部領域を塗りつぶす
                   ctx.fill();
                   // ブロックの描写完了
                   ctx.closePath();
               }
           }
       }
   }

   /**
    * ボールの軌道を消すメソッド
    * 引数: なし
    **/
   function draw() {

       // canvasの内容をリセットするメソッド
       ctx.clearRect(0, 0, canvas.width, canvas.height);
       // drawBricksメソッドを呼び出す
       drawBricks();
       // drawBallメソッドを呼び出す
       drawBall();
       // drawPaddleメソッドを呼び出す
       drawPaddle();
       // 衝突検出関数を呼び出す
       collisionDetection();

       // 左辺と右辺で弾ませる
       if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
           dx = -dx;
       }
       // 上辺で弾ませる
       if (y + dy < ballRadius) {
           dy = -dy;
       } else if (y + dy > canvas.height - ballRadius) {
           // ボールがcanvasの下端付近の場合
           if (x > paddleX && x < paddleX + paddleWidth) {
               // パドルに当たっている場合
               dy = -dy;
           } else {
               // パドルに当たっていない場合
               // アラートメッセージ
               alert("GAME OVER");
               // 再ロードする
               document.location.reload();
               clearInterval(interval);
           }
       }

       // ボタンに合わせてパドルを動かす
       if (rightPressed && paddleX < canvas.width - paddleWidth) {
           // パドルを右移動した時に画面からはみ出ないか？を見ている
           paddleX += 7; // x軸方向に右に7px移動
       } else if (leftPressed && paddleX > 0) {
           // パドルを左移動した時に画面からはみ出ないか？を見ている
           paddleX -= 7; // x軸方向に左に7px移動
       }

       // フレーム毎にx, yを更新する
       x += dx; // x軸に+2px
       y += dy; // y軸に-2px
   }

   // 10ミリ秒毎にボールを呼び出す
   var interval = setInterval(draw, 10);