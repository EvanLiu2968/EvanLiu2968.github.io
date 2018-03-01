<template>
<div>
  <div></div>
</div>
</template>
<style scoped>
</style>
<script>
  export default {
    components:{
      Butterfly
    },
    data: function(){
      return {
      }
    },
    methods: {
      onSubmit() {
        this.$message.success('提交成功！');
      }
    },
    mounted:function(){
      canvas = document.getElementById('tearCloth');
      ctx = canvas.getContext('2d');

      canvas.width = 800;//560
      canvas.height = 800;//350

      start();
    }
  }
</script>
<style scoped>
</style>