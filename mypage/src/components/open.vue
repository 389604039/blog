<template>
  <div id='app'>
        <h1>登录</h1>
        <br>
        <br>
        <el-form >
            <el-form-item  prop="name"> 
                <el-input v-model='input1' placeholder='请输入用户名' >
                    <template slot="prepend">用户名：</template>
                </el-input>
            </el-form-item> 
            <!-- prefix-icon='el-icon-user-solid' -->
            <br>
            <br>
            <el-form-item  prop="pass"> 
                <el-input v-model='input2' placeholder='请输入密码' type="password">
                    <template slot="prepend" >密码：</template>
                </el-input>
            </el-form-item> 
        <!-- prefix-icon='el-icon-key'  -->
        <br>
        <br>
        <el-button type='primary' @click='ok()'>确定</el-button>
        <el-button>取消</el-button>
        </el-form>
    </div>
</template>

<script>
export default {
    // name:open,
    data () {
        return {
            
            input1:'',
            input2:'' ,
            
        }
    },
    methods:{
        ok(){
            let data={
                username:this.input1,
                password:this.input2
            }
             this.$axios.post('http://localhost:8859/in/log',data).then(res=>{
                 if(res.data.length!=0)
                 {
                     localStorage.setItem('name',res.data[0].name);
                     localStorage.setItem('id',res.data[0].id);
                     console.log(res.data[0].name)
                    this.$message({
                        type:'success',
                         message:'验证成功'
                    })
                    this.$router.push({
                        path:'/home'
                    })
                 }
                 else
                 {
                     this.$message({
                        type:'error',
                         message:'验证失败'
                    })
                    // this.$router.push({
                    //     path:'/'
                    // })
                 }
                 
             })
        }
    }
}
</script>

<style>
 #app{
        width: 400px;
        height: 300px;
        margin:100px  auto 0;
        text-align: center;
        
    }
</style>