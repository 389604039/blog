<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
 height: 100%;
}
 html,body,#app,.el-container{
        /*设置内部填充为0，几个布局元素之间没有间距*/
        padding: 0px;
         /*外部间距也是如此设置*/
        margin: 0px;
        /*统一设置高度为100%*/
        height: 100%;
    }
.el-header{
    background: darkgrey;
    color: white;
    text-align: center;
   
}
.el-aside{
    background:gainsboro;
    color: white;
    text-align: center;
    
}
.el-main{
    background:white;
    color: dimgray;
    
}
.el-footer{
    background: darkgrey;
    color: white;
    text-align: center;
}
.tit{
    position: absolute;
    top:3%;
    left: 10%;
    font-size: 40px;
    font-weight: 800;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>
