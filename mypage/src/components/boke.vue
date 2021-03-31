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
                    <el-menu-item index="1" @click="ok1()" disabled>
                        <template slot="title">
                            <span>博客管理</span>
                        </template>
                    </el-menu-item>
                    <el-menu-item index="2" @click="ok2()" >
                        <span slot="title">分类管理</span>
                    </el-menu-item>
                    <el-menu-item index="3" @click="ok3()">
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="ok4()">
                        <span slot="title">文章管理</span>
                    </el-menu-item>
                    </el-menu>
            </el-col>    
        </el-aside> 
        <el-main> 
            <el-row> 
                    <!-- <form>
                        <el-col :span='10' class="col1" style="margin-left: 20px;">
                            <el-input type="text" placeholder="请输入编号" v-model="id">
                                <template slot="prepend">编号：</template>
                            </el-input>
                        </el-col>
                        <el-col :span='10' class="col2" style="margin-left: 20px;">
                            <el-input type="text" placeholder="请输入标题" v-model='title'>
                                <template slot="prepend">标题：</template>
                            </el-input>
                        </el-col>
                        <el-col :span='10' class="col3" style="margin-left: 20px;">
                            <el-input type="text" placeholder="请输入副标题" v-model='subtitle'>
                                <template slot="prepend">摘要：</template>
                            </el-input>
                        </el-col>
                        <el-col :span='10' class="col4" style="margin-left: 20px;">
                            <el-input type="text" placeholder="请输入关于我们内容" v-model='about'>
                                <template slot="prepend">关于我们内容：</template>
                            </el-input>
                        </el-col>
                        <el-button type='success' @click='insert' style="margin-left: 20px;">添加</el-button>
                    </form> -->
                </el-row>
                <br>
                <el-row>
                    <el-table :data='article'>
                        <el-table-column label='编号' prop='id'></el-table-column>
                        <el-table-column label='标题' prop='title'></el-table-column>
                        <el-table-column label='副标题' prop='subtitle'></el-table-column>
                        <el-table-column label='关于' prop='about'></el-table-column>
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
                                <!-- <el-button type='danger'  @click='del(scope.row.id)' style="margin:0">删除</el-button> -->
                            </template> 
                            
                        </el-table-column>
                    </el-table> 
                    
            </el-row> 
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
                    <el-input v-model='a_title'>
                        <template slot="prepend">标题：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_subtitle'>
                        <template slot="prepend">副标题：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_about'>
                        <template slot="prepend">关于我们的内容：</template>
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
            article:[],
                a_id:'',
                a_title:'',
                a_subtitle:'',
                a_about:'',
                a_day:'',
                id:'',
                title:'',
                subtitle:'',
                about:'',
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
            this.$axios.post('http://localhost:8859/in/infoall').then(res=>{
                for(let i=0;i<res.data.length;i++)
                    {
                        res.data[i]['options']=['修改','删除'];
                    }
                    this.article=res.data;
                    //this.userList=res.data;
            })
        },
        // insert:function(){
        //     let data={
        //         id:this.id,
        //         username:this.username,
        //         password:this.password,
        //         name:this.name,
        //         role:this.role
        //     }
        //     this.$axios.post('http://localhost:8859/in/adminadd',data).then(res=>{
        //         this.id='';
        //         this.username='';
        //         this.password='';
        //         this.name='';
        //         this.role='';
        //         this.creat();
        //     }).catch(error=>{
        //             console.log(error)
        //     })
        // },
        // del:function(id){
        //     // console.log(id)
        //     let data={
        //         id:id
        //     }
        //     this.$axios.post('http://localhost:8859/in/admindel',data).then(res=>{
        //         this.creat();
        //     }).catch(error=>{
        //         console.log(error)
        //     })
        // },
        update:function(per){
                this.logo=true
                    this.a_id=per.id;
                    this.a_title=per.title;
                    this.a_subtitle=per.subtitle;
                    this.a_about=per.about;
                    this.a_day=per.created_at
            },
        cancel:function(){
                this.logo=false;
            },
        arevise:function(){
            let data={
                id:this.a_id,
                title:this.a_title,
                subtitle:this.a_subtitle,
                about:this.a_about,
                created_at:this.a_day
            }
            this.$confirm('确认修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('http://localhost:8859/in/infoarevise',data).then(res=>{
               
                    this.logo=false;
                    this.creat(); 
                }).catch(error=>{
                    console.logo(error)
                })
                this.$message({
                type: 'success',
                message: '修改成功!'
            });
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消修改'
          })          
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