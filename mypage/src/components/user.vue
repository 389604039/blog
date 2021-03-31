<template>
  <div id="app"> 
    <el-container> 
        <el-header height="90px"> 
             <div class="tit">博客管理系统</div>
            <el-dropdown style="margin-left:80%;margin-top:4%" @command="handleCommand">
            <span class="el-dropdown-link" style="color: white;">
                {{usname}}<i class="el-icon-arrow-down el-icon--right"></i>
            </span>
            <el-dropdown-menu slot="dropdown">
                <el-dropdown-item command="a">退出</el-dropdown-item>
            </el-dropdown-menu>
            </el-dropdown>
        </el-header> 
    <el-container> 
        <el-aside width="150px">
            <el-col :span="24">
                <el-menu  class="el-menu-vertical-demo" >
                    <el-menu-item index="1" @click="ok1()">
                        <template slot="title">
                            <span>博客管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2" @click="ok2()" >
                        <span slot="title">分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="ok3()" disabled>
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="ok4()">
                        <span slot="title">文章管理</span>
                    </el-menu-item>
                    </el-menu>
            </el-col>    
        </el-aside> 
        <el-main> 
            <el-tabs v-model="activeName">
                <el-tab-pane label="用户管理" name="first">
                   <el-row>
                    <el-table :data='article'>
                        <el-table-column label='编号' prop='id'></el-table-column>
                        <el-table-column label='用户名' prop='username'></el-table-column>
                        <el-table-column label='密码' prop='password'></el-table-column>
                        <el-table-column label='姓名' prop='name'></el-table-column>
                        <el-table-column label='角色' prop='role'></el-table-column>
                        <el-table-column label='上次登录时间' prop='last_login_at'>
                            <template slot-scope="scope"> 
                                <span>{{ scope.row.last_login_at | dateFormat }}</span> 
                            </template> 
                        </el-table-column>
                        <el-table-column label='创建时间' prop='created_at'>
                            <template slot-scope="scope"> 
                                <span>{{ scope.row.created_at | dateFormat }}</span> 
                            </template> 
                        </el-table-column>
                        <el-table-column label='修改时间' prop='updated_at'>
                            <template slot-scope="scope"> 
                                <span>{{ scope.row.updated_at | dateFormat }}</span> 
                            </template> 
                        </el-table-column>
                        <el-table-column label='操作' prop='id'>
                            <template slot-scope="scope"> 
                                <el-button type='success' @click='update(scope.row)' style="margin:0">修改</el-button> 
                                <el-button type='danger'  @click='del(scope.row.id)' style="margin:0">删除</el-button>
                            </template> 
                            
                        </el-table-column>
                    </el-table>    
                </el-row> 
                </el-tab-pane>
                <el-tab-pane label="增加用户" name="second">
                    <el-row> 
                    <form >
                        <el-row>
                        <el-col :span='8' :offset="7" class="col1" >
                            <el-input type="text" placeholder="请输入编号" v-model="id">
                                <template slot="prepend">编号：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <br>
                        <el-row>
                         <el-col :span='8' :offset="7" class="col2" >
                            <el-input type="text" placeholder="请输入用户名" v-model='username'>
                                <template slot="prepend">用户名：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <br>
                        <el-row>
                        <el-col :span='8' :offset="7" class="col3" >
                            <el-input type="text" placeholder="请输入密码" v-model='password'>
                                <template slot="prepend">密码：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <br>
                        <el-row>
                        <el-col :span='8' :offset="7" class="col4" >
                            <el-input type="text" placeholder="请输入姓名" v-model='name'>
                                <template slot="prepend">姓名：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <br>
                        <el-row>
                        <el-col :span='8' :offset="7" class="col5" >
                            <el-input type="text" placeholder="请输入角色" v-model='role'>
                                <template slot="prepend">角色：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <br>
                        <br>
                        <el-row>
                            <el-col :span='2' :offset="11" class="col5" >
                                <el-button type='success' @click='insert'>立即添加</el-button>
                            </el-col>
                            <el-col :span='2'  class="col5" >
                                <el-button @click="cansl" >取 消</el-button>
                            </el-col>
                         
                        </el-row>
                    </form>
                </el-row>
                </el-tab-pane>
            </el-tabs>
            
                <br>
            
                <br>
                
        </el-main> 
    </el-container> 
        <el-footer height="70px">&copy;德云 IT 学院</el-footer> 
    </el-container>
    <el-dialog title="修改" :visible.sync="logo" width='600px'>
        <form>
            <el-row >
                <el-col :span='16' :offset="4"  >
                    <el-input v-model='a_id' readonly >
                        <template slot="prepend">编号：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_username'>
                        <template slot="prepend">用户名：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_password'>
                        <template slot="prepend">密码：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_name'>
                        <template slot="prepend">姓名：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_role'>
                        <template slot="prepend">角色：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <br>
            <br>
        </form>
        <div slot="footer" class="dialog-footer">
        <el-button @click="logo= false">取 消</el-button>
        <el-button type="primary" @click="arevise">确 定</el-button>
        </div>
        </el-dialog> 
        </div>
</template>

<script>
export default {
    data(){
        return{
            activeName: 'first',
            article:[],
            a_id:'',
            a_username:'',
            a_password:'',
            a_name:'',
            a_role:'',
            a_day:'',
            id:'',
            username:'',
            password:'',
            name:'',
            role:'',
            day:'',
            logo:false,
            usname:localStorage.getItem("name")
        }
    },
    filters:{
            dateFormat:function(value){
                let date =new Date(value);
                let y=date.getFullYear();
                let m=date.getMonth()+1;
                let d=date.getDate();
                
                return `${y}-${m<10?'0'+m:m}-${d<10?'0'+d:d}`;
            }
        },
     created:function(){
            this.creat();
        },
    methods:{
        creat:function(){
            this.$axios.post('http://localhost:8859/in/adminall').then(res=>{
                for(let i=0;i<res.data.length;i++)
                    {
                        res.data[i]['options']=['修改','删除'];
                    }
                    this.article=res.data;
                    //this.userList=res.data;
            })
        },
        insert:function(){
            let data={
                id:this.id,
                username:this.username,
                password:this.password,
                name:this.name,
                role:this.role
            }
            this.$axios.post('http://localhost:8859/in/adminadd',data).then(res=>{
                this.id='';
                this.username='';
                this.password='';
                this.name='';
                this.role='';
                this.creat();
            }).catch(error=>{
                    console.log(error)
            })
        },
        del:function(id){
            // console.log(id)
            let data={
                id:id
            }
            this.$axios.post('http://localhost:8859/in/admindel',data).then(res=>{
                this.creat();
            }).catch(error=>{
                console.log(error)
            })
        },
        update:function(per){
                this.logo=true
                this.a_id=per.id;
                this.a_username=per.username;
                this.a_password=per.password;
                this.a_name=per.name;
                this.a_role=per.role;
                this.a_day=per.created_at
            },
        arevise:function(){
            let data={
                id:this.a_id,
                username:this.a_username,
                password:this.a_password,
                name:this.a_name,
                role:this.a_role,
                created_at:this.a_day
            }
            this.$axios.post('http://localhost:8859/in/adminarevise',data).then(res=>{
                alert('确认修改');
                    this.logo=false;
                    this.creat(); 
            }).catch(error=>{
                    console.logo(error)
                })
        },
        ok1:function(){
            this.$router.push({
                path:'/boke'
        })
        },
         ok2:function(){
            this.$router.push({
                path:'/home'
        })
        },
         ok3:function(){
            this.$router.push({
                path:'/user'
        })
        },
         ok4:function(){
            this.$router.push({
                path:'/text'
        })
        },
        cansl:function(){
            this.id='';
            this.username='';
            this.password='';
            this.name='';
            this.role='';
                
        },
        handleCommand(command) {
            this.$router.push({
                path:'/'
            })
        }
    }

}
</script>

<style>
 html,body,#app,.el-container{
        padding: 0px;
        margin: 0px;
        height: 100%;
        width: 100%;
    }
/* .el-header{
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
} */

.zhe{
position: fixed;
top: 0;
left: 0;
right: 0;
bottom: 0;
background: rgba(0,0,0,0.3);
}
.nei{
    width: 400px;
    height: 300px;
    background: white;
    position: fixed;
    top: 20%;
    left: 35%;
    text-align: center;
}
.nei form{
    margin: 50px 20px 20px;
    text-align: center;
}
.nei1{
    width: 400px;
    height: 600px;
    background: white;
    position: fixed;
    top: 20%;
    left: 35%;
    text-align: center;
}
.nei1 form{
    margin: 50px 20px 20px;
    text-align: center;
}
</style>