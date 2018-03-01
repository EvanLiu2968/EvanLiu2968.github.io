<template>
  <div id="butterfly"></div>
</template>

<script>
import THREE from "../assets/lib/three/three";
import leftWing from "../assets/images/left-wing.png";
import rightWing from "../assets/images/right-wing.png";
console.log(THREE)
function butterflyInit(container,width,height){
  /**
   * 创建场景对象
   */
  var scene=new THREE.Scene();
  /**
   * 创建网格模型
   */
  /*** 左翅膀*/
  var geometryLeft=new THREE.PlaneGeometry( 100, 100 );//创建一个立方体几何对象
  geometryLeft.translate ( -29, 0, -1 );
  let textureLeft = THREE.ImageUtils.loadTexture(leftWing);
  var materialLeft=new THREE.MeshLambertMaterial({
      map:textureLeft,//给纹理属性map赋值
      side:THREE.DoubleSide,//两面可见
      transparent:true,
  });//材质对象
  var meshLeft=new THREE.Mesh(geometryLeft,materialLeft);//网格模型对象
  /*** 右翅膀*/
  var geometryRight=new THREE.PlaneGeometry( 100, 100 );//创建一个立方体几何对象
  geometryRight.translate ( 29, 0, 0 );
  let textureRight = THREE.ImageUtils.loadTexture(rightWing);
  var materialRight=new THREE.MeshLambertMaterial({
      map:textureRight,//给纹理属性map赋值
      side:THREE.DoubleSide,//两面可见
      transparent:true,
  });//材质对象
  var meshRight=new THREE.Mesh(geometryRight,materialRight);//网格模型对象
  /*** 身体*/
  var geoHead=new THREE.SphereGeometry(3,25,25);
  var materialHead=new THREE.MeshPhongMaterial({
      color:0x351233,
      specular:0x351233,//金属
      //specular:0x222222,//塑料
      shininess:5    });
  var meshHead=new THREE.Mesh(geoHead,materialHead);
  meshHead.scale.y = 0.6;
  meshHead.translateY(9);
  var geoBack=new THREE.SphereGeometry(3,25,25);
  var materialBack=new THREE.MeshPhongMaterial({
      color:0x351233,
      specular:0x351233,//金属
      //specular:0x222222,//塑料
      shininess:5    });
  var meshBack=new THREE.Mesh(geoBack,materialBack);
  meshBack.scale.y = 3;
  meshBack.translateY(-1);
  var geoTail=new THREE.SphereGeometry(2,25,25);
  var materialTail=new THREE.MeshPhongMaterial({
      color:0x351233,
      specular:0x351233,//金属
      //specular:0x222222,//塑料
      shininess:5    });
  var meshTail=new THREE.Mesh(geoTail,materialTail);
  let meshBody = new THREE.Object3D();
  meshTail.scale.y = 7;
  meshTail.translateY(-10);

  var geoAntennaLeft = new THREE.TorusGeometry( 50, 0.15, 16, 100 ,0.6);
  var materialAntennaLeft = new THREE.MeshPhongMaterial({
      color:0x000000,
      specular:0x000000,//金属
      //specular:0x222222,//塑料
      shininess:5    });
  var meshAntennaLeft = new THREE.Mesh( geoAntennaLeft, materialAntennaLeft );
  meshAntennaLeft.translateX(-50);

  var geoAntennaRight = new THREE.TorusGeometry( 50, 0.15, 16, 100 ,0.6);
  var materialAntennaRight = new THREE.MeshPhongMaterial({
      color:0x000000,
      specular:0x000000,//金属
      //specular:0x222222,//塑料
      shininess:5    });
  var meshAntennaRight = new THREE.Mesh( geoAntennaRight, materialAntennaRight );
  meshAntennaRight.rotateZ ( -3.8);
  meshAntennaRight.translateX(-41);
  meshAntennaRight.translateY(-28);

  var geoAntennaLeftTop = new THREE.SphereGeometry( 0.5, 25, 25);
  var materialAntennaLeftTop  = new THREE.MeshPhongMaterial({
      color:0x000000,
      specular:0x000000,//金属
      shininess:5
  });
  var meshAntennaLeftTop  = new THREE.Mesh( geoAntennaLeftTop , materialAntennaLeftTop  );
  meshAntennaLeftTop.scale.y = 4;
  meshAntennaLeftTop.rotateZ(0.5);
  meshAntennaLeftTop.translateX(6);
  meshAntennaLeftTop.translateY(30);

  var geoAntennaRightTop = new THREE.SphereGeometry( 0.5, 25, 25);
  var materialAntennaRightTop  = new THREE.MeshPhongMaterial({
      color:0x000000,
      specular:0x000000,//金属
      shininess:5
  });
  var meshAntennaRightTop  = new THREE.Mesh( geoAntennaRightTop , materialAntennaRightTop  );
  meshAntennaRightTop.scale.y = 4;
  meshAntennaRightTop.rotateZ(-0.5);
  meshAntennaRightTop.translateX(-4.5);
  meshAntennaRightTop.translateY(30);

  meshBody.add(meshHead,meshBack,meshTail,meshAntennaLeft,meshAntennaRight,meshAntennaLeftTop,meshAntennaRightTop);

  let obj = new THREE.Object3D();
  obj.add(meshLeft,meshRight,meshBody);
  obj.rotateY(0.6);
  obj.rotateZ(-0.3);

//    let obj2 = obj .clone ();
  let objArr = [obj];
  for (let i = 0; i < 10; i++){
      objArr.push(obj .clone ())
  }
  scene.children = objArr;//网格模型添加到场景中
//    scene.add(objArr);
  /**
   * 光源设置
   */
      //点光源
  var point=new THREE.PointLight(0xffffff);
  point.position.set(400,200,300);//点光源位置
  scene.add(point);//点光源添加到场景中
  //点光源
  var point2=new THREE.PointLight(0xffffff);
  point2.position.set(-400,-200,-300);//点光源位置
  scene.add(point2);//点光源添加到场景中
  //环境光
  var ambient=new THREE.AmbientLight(0x444444);
  scene.add(ambient);
  /**
   * 坐标轴辅助显示
   */
  var axisHelper = new THREE.AxisHelper( 300 );
  //    scene.add( axisHelper );
  /**
   * 相机设置
   */

  var k = width/height;//窗口宽高比
  var s = 250;//三维场景缩放系数
  //创建相机对象
  var camera=new THREE.OrthographicCamera(-s*k,s*k, s,-s,1,1000);
  camera.position.set(100,-300,200);//设置相机位置
  camera.lookAt(scene.position);//设置相机方向(指向的场景对象)
  /**
   * 创建渲染器对象
   */
  var renderer=new THREE.WebGLRenderer({alpha:true});
  renderer.setSize(width,height);
//    renderer.setClearColor(0xb9d3ff,1);//设置背景颜色
  
  container.appendChild(renderer.domElement);//元素中插入canvas对象
  let n = 0;
  let X = -0;
  let Y = 0;
  let Z = 0;
  let bool = true;
  //    var axis = new THREE.Vector3(0,1,0);//向量axis
  //每只蝴蝶的起点计算
  let startXArr = [];
  let startZArr = []
  for (let i = 0; i < 11; i++){
      startXArr.push(Math.random() * 1500);
      startZArr.push(Math.random() * 1500);
  }
  function render() {
      /*** 翅膀批量煽动*/
      for (let i = 0; i < 11; i++){
          objArr[i].children[0].rotation.y = n * 0.02;
          objArr[i].children[1].rotation.y = -n * 0.02;
      }
      /*** 翅膀批量飞行
       * 起点不同
       * 如何模型生物种群*/
      for (let i = 0; i < 11; i++){
          objArr[i].position.set(X - startXArr[i],0,X/2-startZArr[i])
      }

      renderer.render(scene,camera);//执行渲染操作
      requestAnimationFrame(render);//请求再次执行渲染函数render
  }
  obj.position.set(-100,0,0)
  render();



  function fun() {
      if(n === 40){
          bool = false;
      }
      if(n === 0){
          bool = true;
      }
      if(bool){
          n = n+1;
      }
      else {
          n = n-1
      }
  }
  //间隔200ms周期性调用函数fun
  setInterval(fun,5);

  function XFun() {
      X = X+1;
      if(X === 2000){
          X = -0;
          for (let i = 0; i < 11; i++){
              startXArr.push(Math.random() * 1500);
              startZArr.push(Math.random() * 1500);
          }

      }
  }
  //间隔200ms周期性调用函数fun
  setInterval(XFun,8);
}
export default {
  props:{
    root:{
      type: String,
      default: 'body'
    }
  },
  data: function(){
    return {
    }
  },
  methods: {
  },
  beforeMount:function(){
  },
  mounted:function(){
    if(this.root==='body'){
      var container=document.createElement("div");
      container.className='butterfly';
      document.body.appendChild(container);
    }else{
      var container=document.getElementById('butterfly')
      container.className='butterfly';
    }
    var width = window.innerWidth;//窗口宽度
    var height = window.innerHeight;//窗口高度
    butterflyInit(container,width,height)
  }
}
</script>

<style>
.butterfly{
  position:fixed;
  top:0;bottom:0;
  left:0;right:0;
}
</style>