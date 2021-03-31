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
                    <el-menu-item index="3" @click="ok3()">
                        <span slot="title">用户管理</span>
                    </el-menu-item>
                    <el-menu-item index="4" @click="ok4()" disabled>
                        <span slot="title">文章管理</span>
                    </el-menu-item>
                    </el-menu>
            </el-col>    
        </el-aside> 
        <el-main>
            <el-tabs v-model="activeName">
                <el-tab-pane label="文章管理" name="first">
                    <el-row>
                    <el-table :data='article'>
                        <el-table-column label='编号' prop='id'></el-table-column>
                        <el-table-column label='标题' prop='title'></el-table-column>
                        <el-table-column label='摘要' prop='a_desc'></el-table-column>
                        <el-table-column label='内容' prop='content'></el-table-column>
                        <el-table-column label='分类' prop='cate'></el-table-column>
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
                <el-tab-pane label="增加文章" name="second">
                    <form >
                        <el-row >
                        <el-col :span='12' :offset="6" class="col1" >
                            <el-input type="text" placeholder="请输入编号" v-model="id">
                                <template slot="prepend">编号：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <el-row >
                        <el-col :span='12' :offset="6" class="col2" >
                            <el-input type="text" placeholder="请输入标题" v-model='title'>
                                <template slot="prepend">标题：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <el-row >
                        <el-col :span='12' :offset="6" class="col3" >
                            <el-input type="textarea" :rows="2" placeholder="请输入摘要" v-model='desc'>
                                <template slot="prepend">摘要：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <el-row >
                        <el-col :span='12' :offset="6" class="col4" >
                            <el-input type="textarea" :rows="10" placeholder="请输入内容" v-model='content'>
                                <template slot="prepend">内容：</template>
                            </el-input>
                        </el-col>
                        </el-row>
                        <el-row >
                        <el-col :span='10' :offset="4" class="col5" >
                            <el-select placeholder="请输入分类" v-model='cate'>
                                <el-option v-for="i in catename" :key="i.name" :label="i.name" :value="i.value">
                                </el-option>
                            </el-select>
                            
                        </el-col>
                        </el-row>
                        <el-row >
                        <el-col :span='4' :offset="14" class="col5" >
                            <el-button type='success' @click='insert' style="margin-left: 20px;">添加</el-button>
                            <el-button @click="cansl" style="">取 消</el-button>
                        </el-col>
                        </el-row>
                        
                    </form>
                <br>
                </el-tab-pane>
            </el-tabs>
            
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
                    <el-input v-model='a_title'>
                        <template slot="prepend">标题：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_desc'>
                        <template slot="prepend">摘要：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-input v-model='a_content'>
                        <template slot="prepend">内容：</template>
                    </el-input>
                </el-col>
            </el-row>
            <br>
            <el-row >
                <el-col :span='16' :offset="4" >
                    <el-select placeholder="请输入分类" v-model='a_cate'>
                                <el-option v-for="i in catename" :key="i.name" :label="i.name" :value="i.value">
                                </el-option>
                            </el-select>
                    <!-- <el-input v-model='a_cate'>
                        <template slot="prepend">所属分类：</template>
                    </el-input> -->
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
            a_title:'',
            a_desc:'',
            a_content:'',
            a_cate:'',
            a_day:'',
            id:'',
            title:'',
            desc:'',
            content:'',
            cate:'',
            day:'',
            logo:false,
            usname:localStorage.getItem("name"),
            catename:JSON.parse(localStorage.getItem("catename"))
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
            this.$axios.post('http://localhost:8859/in/articleall').then(res=>{
                    this.article=res.data;
                    //this.userList=res.data;
            })
        },
        insert:function(){
            let data={
                id:this.id,
                title:this.title,
                a_desc:this.desc,
                content:this.content,
                cate:this.cate
            }
            this.$confirm('确认添加?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('http://localhost:8859/in/articleadd',data).then(res=>{
                    this.id='';
                    this.title='';
                    this.desc='';
                    this.content='';
                    this.cate='';
                    this.creat();
                }).catch(error=>{
                    console.log(error)
            })
                this.$message({
                type: 'success',
                message: '添加成功!'
            });
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消添加'
          })          
        })
            
        },
        del:function(id){
            // console.log(id)
            let data={
                id:id
            }
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('http://localhost:8859/in/articledel',data).then(res=>{
                    this.creat();
                }).catch(error=>{
                    console.log(error)
                })
                this.$message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
            this.$message({
            type: 'info',
            message: '已取消删除'
          })          
        })
           
        },
        update:function(per){
                this.logo=true
                this.a_id=per.id;
                this.a_title=per.title;
                this.a_desc=per.a_desc;
                this.a_content=per.content;
                this.a_cate=per.cate;
                this.a_day=per.created_at
            },
        cancel:function(){
                this.logo=false;
            },
        arevise:function(){
            let data={
                id:this.a_id,
                title:this.a_title,
                a_desc:this.a_desc,
                content:this.a_content,
                cate:this.a_cate,
                created_at:this.a_day
            }
            this.$confirm('确认修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                 this.$axios.post('http://localhost:8859/in/articlearevise',data).then(res=>{
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
        cansl:function(){
            this.id='';
            this.title='';
            this.desc='';
            this.content='';
            this.cate='';
                
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
.el-row {
    margin-bottom: 20px;
   
  }
</style>