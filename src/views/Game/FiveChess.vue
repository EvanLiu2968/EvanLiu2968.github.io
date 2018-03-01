<template>
<div class="fivechess-wrap">
  <canvas id="board" width="1200" height="600"></canvas>
  <canvas id="chess" width="1200" height="600"></canvas>
  <canvas id="animate" width="1200" height="600"></canvas>
  <div style="position:absolute;top:20px;right:0;width:300px" v-bind:style="{display:didMount?'block':'none'}">
    <el-button type="primary" id="resetBtn">重新开始</el-button>
    <el-button type="primary" id="backPrevBtn">回到上一步</el-button>
  </div>
</div>
</template>
<style scoped>
  .fivechess-wrap{
    position:relative;margin:0 auto;width:1200px;
  }
  #chess,#animate{
    position:absolute;top:0;left:0;width:1200px;height:600px;
  }
  #board{
    position:relative;width:1200px;height:600px;border-radius:6px;
  }
</style>
<script>
  export default {
    data: function(){
      return {
        didMount:false
      }
    },
    methods: {
      onSubmit() {
        this.$message.success('提交成功！');
      }
    },
    mounted:function(){
      const $this=this;
      let board=document.getElementById("board"),b=board.getContext("2d");//获取棋盘层上下文
      let chess=document.getElementById("chess"),c=chess.getContext("2d");//获取棋子层上下文
      let animate=document.getElementById("animate"),a=animate.getContext("2d");//获取动画层上下文
      let clientwidth=document.documentElement.clientWidth;
      let clientheight=document.documentElement.clientHeight;
      let chessBoard=[];       //将落子坐标化，创建棋盘二维数组；
      let me=true,over=false,flash=false;//设定第一步为me落棋，即黑子
      let x, y,t=500;              //定义画布坐标，animation时间；
      let myWin=[],computerWin=[];
      let WinData=getWinData(),wins=WinData.wins,count=WinData.count;
      let backimage=new Image();               //创建背景
      backimage.src="static/images/board.jpg";
      backimage.onload=function(){             //加载背景
        b.drawImage(backimage,0,0,1200,600);  //绘制背景
        drawChessBoard();                     //绘制棋盘
        drawTaiJi(b,200,300,150,"#000000",Math.PI); //绘制太极
        drawTaiJi(b,1000,300,150,"#ffffff",0);
        drawChessPiece(b,200,225,false);      //绘制太极棋眼
        drawChessPiece(b,1000,375,true);
        b.font="bolder 50px 宋体";
        b.fillText("Player",950,540);
        b.fillStyle="#ffffff";
        b.fillText("AlphaDog",50,540);
        reset();
        $this.didMount=true;
      };
      let resetBtn=document.getElementById("resetBtn");
      let backPrevBtn=document.getElementById("backPrevBtn");
      let memoryList=[],
        memory={
          player:[0,0],
          alphadog:[0,1]
        };
      resetBtn.onclick=function(){
        reset();
      };
      backPrevBtn.onclick=function(){
        console.log(memoryList);
        if(memoryList.length>0){
          let cache=memoryList.splice(-1,1);
          let player=cache[0].player,alphadog=cache[0].alphadog;
          clearStep(player[0],player[1]);
          clearStep(alphadog[0],alphadog[1]);
        }else{
          $this.$alert('人生如棋，落子无悔。','提示');
        }
      };
      function clearStep(i,j){
        console.log(i,j);
        chessBoard[i][j]=0;
        c.clearRect(320+i*40-15,20+j*40-15,30,30);
      }
      function reset(){           //重置棋盘；
        for (let i= 0;i<15;i+=1){
          chessBoard[i]=[];
          for (let j=0;j<15;j+=1){
            chessBoard[i][j]=0;  //遍历数组，值初始化为0；
          }
        }
        for(let i=0;i<count;i++){  //初始化数组；
          myWin[i]=0;
          computerWin[i]=0
        }
        a.clearRect(0,0,1200,600);
        c.clearRect(0,0,1200,600);
        me=true;             //设定第一步为me落棋，即黑子
        over=false;
      }

      function getWinData(){
        let wins=[],count = 0;              //创建赢法三维数组；
        for (let i= 0;i<15;i+=1){
          wins[i]=[];
          for (let j=0;j<15;j+=1){
            wins[i][j]=[];
          }
        }
        for (let i= 0;i<15;i+=1){    //遍历横向赢法数组
          for (let j=0;j<11;j+=1){
            for (let k=0;k<5;k+=1){
              wins[i][j+k][count]=true;
            }
            count++;
          }
        }
        for (let i= 0;i<15;i+=1){   //遍历纵向赢法数组
          for (let j=0;j<11;j+=1){
            for (let k=0;k<5;k+=1){
              wins[j+k][i][count]=true;
            }
            count++;
          }
        }
        for (let i= 0;i<11;i+=1){   //遍历反斜向赢法数组
          for (let j=0;j<11;j+=1){
            for (let k=0;k<5;k+=1){
              wins[i+k][j+k][count]=true;
            }
            count++;
          }
        }
        for (let i= 4;i<15;i+=1){  //遍历斜向赢法数组
          for (let j=0;j<11;j+=1){
            for (let k=0;k<5;k+=1){
              wins[i-k][j+k][count]=true;
            }
            count++;
          }
        }
        return {
          wins:wins,
          count:count
        }
      }
      
      function drawChessBoard() {  //定义绘制棋盘函数
        b.strokeStyle="#454545";
        b.lineWidth=1;
        for(let i=0;i<15;i+=1){
          b.beginPath();
          b.moveTo(320+i*40,20);
          b.lineTo(320+i*40,580);
          b.stroke();
          b.closePath();
          b.beginPath();
          b.moveTo(320,20+i*40);
          b.lineTo(880,20+i*40);
          b.stroke();
          b.closePath();
        }
      }

      function oneStep(i,j,me){      //定义落子函数；
        c.beginPath();
        c.arc(320+i*40,20+j*40,15,0,Math.PI*2);
        c.closePath();
        let gradient= c.createRadialGradient(320+i*40,20+j*40,10,320+i*40+2,20+j*40-2,0);//创建圆形渐变，两个圆之间为渐变区域；
        if(me){                      //绘制黑棋；
          gradient.addColorStop(0,"#0a0a0a"); // gradient.addColorStop(0.3,"blue"); 可以在渐变区域渐变多种颜色；
          gradient.addColorStop(1,"#636363");
        }
        else{                        //绘制白棋；
          gradient.addColorStop(0,"#e1e1e1");
          gradient.addColorStop(1,"#f1f1f1");
        }
        c.fillStyle=gradient;
        setTimeout(function(){    //延迟落子，时间为动画时间；
          c.fill();
          flash=false;
        },500);
      }

      animate.onclick=function(e){      //定义棋盘点击落子事件
        if(over){
          return;
        }
        if(!me){
          return;
        }
        if(flash){
          return
        }
        let x = e.offsetX;       //用offset方法获取屏幕点与canvas元素原点的相对坐标；
        let y = e.offsetY;
        let i=Math.floor(x/40-7.5);       //向下取整；完整算法为：（x-边距+棋格宽度/2）/40，此处边距等于320,棋格40；
        let j=Math.floor(y/40);
        console.log(chessBoard[i][j]);
        if(chessBoard[i][j]==0) {     //判断当前位置是否有棋子，无则执行落棋
          let m=i*40+320;                 //计算计算落子的坐标
          let n=j*40+20;
          animation(m,n,me);              //执行落子动画；
          flash=true;
          oneStep(i,j,me);    //落子；
          chessBoard[i][j]=1; //设定黑子位置为1；
          memory.player=[i,j];//存储玩家落子位置
          for(let k=0;k<count;k++){
            if(wins[i][j][k]){
              myWin[k]++;
              computerWin[k]=6;
              if(myWin[k]==5){
                over=true;
                $this.$alert('AlphaDog：放学别走，让我大哥AlphaGo来教你做人！', '恭喜，你赢了！', {
                  confirmButtonText: '再来一盘',
                  callback: action => {
                    reset();
                  }
                });
              }
            }
          }
          if(!over){
            me = !me;                 //将me取反为false,对方落子；
            setTimeout(computerAI,500); //延迟电脑落子500毫秒；
          }
        }
      }
      function computerAI(){            //定义计算机智能落子函数；
        let myScore=[];
        let computerScore=[];
        let max=0;
        let u= 0,v=0;
        for(let i=0;i<15;i++){
          myScore[i]=[];
          computerScore[i]=[];
          for(let j=0;j<15;j++){
            myScore[i][j]=0;
            computerScore[i][j]=0;
          }
        }
        for (let i= 0;i<15;i+=1){
          for (let j=0;j<15;j+=1){
            if(chessBoard[i][j]==0){
              for(let k=0;k<count;k++){
                if(wins[i][j][k]){
                  if(myWin[k]==1){
                    myScore[i][j]+=200;
                  }else if(myWin[k]==2){
                    myScore[i][j]+=400;
                  }else if(myWin[k]==3){
                    myScore[i][j]+=2000;
                  }else if(myWin[k]==4){
                    myScore[i][j]+=10000;
                  }
                  if(computerWin[k]==1){
                    computerScore[i][j]+=210;
                  }else if(computerWin[k]==2){
                    computerScore[i][j]+=420;
                  }else if(computerWin[k]==3){
                    computerScore[i][j]+=2400;
                  }else if(computerWin[k]==4){
                    computerScore[i][j]+=20000;
                  }
                }
              }
              if(myScore[i][j]>max){
                max=myScore[i][j];
                u=i;
                v=j;
              }else if(myScore[i][j]==max){
                if(computerScore[i][j]>computerScore[u][v]){
                  u=i;
                  v=j;
                }
              }
              if(computerScore[i][j]>max){
                max=computerScore[i][j];
                u=i;
                v=j;
              }else if(computerScore[i][j]==max){
                if(myScore[i][j]>myScore[u][v]){
                  u=i;
                  v=j;
                }
              }
            }
          }
        }
        let m=u*40+320;                 //计算计算落子的坐标
        let n=v*40+20;
        animation(m,n,me);              //执行落子动画；
        flash=true;
        oneStep(u,v,me);      //在分数最高的位置落子；
        chessBoard[u][v]=2;       //设定白子位置为2；
        memory.alphadog=[u,v];//存储AI落子位置
        memoryList.push(JSON.parse(JSON.stringify(memory))); //存入每一步的数据
        for(let k=0;k<count;k++){
          if(wins[u][v][k]){
            computerWin[k]++;
            myWin[k]=6;
            if(computerWin[k]==5){
              over=true;
              $this.$alert('AlphaDog：回去多练练吧，毕竟我的大哥是AlphaGo！', '抱歉，你输了！', {
                confirmButtonText: '再来一盘',
                callback: action => {
                  reset();
                }
              });
            }
          }
        }
        if(!over){
          me=!me;
        }
      }
      function drawTaiJi(context,x,y,r,color,deg){ //定义绘制太极图函数，参数为上下文id，x/y坐标,半径，颜色，角度；
        context.save();           //保存状态
        context.translate(x,y);   //设置画布旋转的中心点
        context.rotate(deg);
        context.translate(-x,-y); //
        context.shadowColor="rgba(10,10,10,0.5)"; //阴影颜色
        context.shadowOffsetX=context.shadowOffsetY=5;  //阴影方向
        context.shadowBlur=5;  //高斯值
        context.fillStyle=color;
        context.beginPath();
        context.arc(x,y,r,Math.PI*1.5,Math.PI*0.5);
        context.arc(x,y+r/2,r/2,Math.PI*0.5,Math.PI*1.5);
        context.arc(x,y-r/2,r/2,Math.PI*0.5,Math.PI*1.5,true);  //默认顺时针，值为false；逆时针为true；
        context.lineJoin="round";
        context.closePath();
        context.fill();
        context.shadowColor="rgba(10,10,10,0)";  //初始化阴影颜色
        context.restore();         //恢复状态；
      }
      function drawChessPiece(context,x,y,color){     //绘制棋子函数
        context.beginPath();
        context.arc(x,y,15,0,2*Math.PI);
        context.closePath();
        let gradient= c.createRadialGradient(x,y,10,x+2,y-2,0);//创建圆形渐变，两个圆之间为渐变区域；
        if(color){                      //绘制黑棋；
          gradient.addColorStop(0,"#0a0a0a");
          gradient.addColorStop(1,"#636363");
        }
        else{                                 //绘制白棋；
          gradient.addColorStop(0,"#e1e1e1");
          gradient.addColorStop(1,"#f1f1f1");
        }
        context.fillStyle=gradient;
        context.fill();
      }
      function animation(i,j,me){              //棋子落子时的动画函数；
        let chessEye={};
        if(me){                               //判断哪方落子
          chessEye.x=1000,chessEye.y=375;
        }else {                           //白子落子；
          chessEye.x=200,chessEye.y=225;
        }
        let sx=(chessEye.x-i)/10;              //将两点之间x轴、y轴分别分成10段
        let sy=(chessEye.y-j)/10;
        let k=1;
        timer();
        function timer() {
          if (k< 11) {
            a.clearRect(0,0,1200,600);
            drawChessPiece(a, chessEye.x - sx*k, chessEye.y - sy*k, me); //绘制十次棋子
            k++;
            setTimeout(timer, 50);
          }else{
            a.clearRect(0,0,1200,600);
          }
        }
      }
    }
  }
</script>