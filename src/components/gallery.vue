<template>
  <div class="gallery">
    <div id="container">
        <div class="photo-box" :id="item.id" v-for="(item,index) in photoArr" :class="{'center':item.id==centerId}" @click="clickHandler(item)" :style="{left: item.left+'px',
    top: item.top+'px', transform: 'rotate('+item.rotate+'deg)'
  }">
            <div class="overturn">
                <div class="front" :style="{transform:'rotateY('+item.frontRotateY+'deg)'}">
                  <img :src="item.src"><p>{{item.name}}</p>
                </div>

                <div class="back" :style="{transform:'rotateY('+item.backRotateY+'deg)'}">
                  <div class="des">
                    <p>{{item.description}}</p>
                  </div>
                </div>
            </div>
        </div>
    </div>
  </div>
</template>

<script>
import AXIOS from '../axios/axios';
const Axios = new AXIOS();

export default {
  name: 'gallery',
  data () {
    return {
      photoArr:[],
      centerId:0
    }
  },
  mounted(){
    this.getPhotoArr(()=>{
          this.photoArr.forEach((item,index)=>{
            this.randomPos(item);
          });
        });
   },
  methods:{
    getPhotoArr(cal){
       let params = {
        api: 'static/photo.json',
        param: ''
      };
       Axios.get(params)
        .then( res =>{
          if( res.status == 200 ){
            this.photoArr= res.data.result;
            cal();
          }
        })
        .catch( res =>{
          console.log(res);
        });
    },
    clickHandler(item){
      var curId=item.id;
      if(curId==this.centerId){
          this.overturn(item);
      }
      else{
          this.centerId=curId;
          this.photoArr.forEach((item,index)=>{
            if(item.id!=this.centerId){
              this.randomPos(item);
            if(item.frontRotateY==180)
              this.overturn(item);
            }
          });
      }
    },
    overturn(item){
      if(item.frontRotateY){
        if(item.frontRotateY==180){
          item.frontRotateY=0;
          item.backRotateY=180;
        }else{
          item.frontRotateY=180;
          item.backRotateY=0;
        }
      }else{
          this.$set(item,"frontRotateY",180);
          this.$set(item,"backRotateY",0);  
      }
    },
    random(j,k){                       
      return Math.floor(Math.random()*k)+j;
    },
    randomPos(item){ 
      if( typeof item.left == 'undefined' ){
          //Vue.set(product,"checked",true);  全局注册
          this.$set(item,"left",this.random(-130,document.body.offsetWidth-130)); //局部注册
          this.$set(item,"top",this.random(-170,document.body.offsetHeight-170)); 
          this.$set(item,"rotate",this.random(-90,90));
        }else{ 
          item.left=this.random(-130,document.body.offsetWidth-130);
          item.top=this.random(-170,document.body.offsetHeight-170);
          item.rotate=this.random(-90,90);
        }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
