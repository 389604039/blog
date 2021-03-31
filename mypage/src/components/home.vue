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
                    <el-menu-item index="2" @click="ok2()" disabled>
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
            <!-- <el-row>  -->
            <el-row >
                <el-col :span='1'  >
                   <el-button type="text" @click="dialogFormVisible = true" >增加分类</el-button> 
                </el-col>
            </el-row>
            
                
                
                        <el-dialog title="添加分类" :visible.sync="dialogFormVisible">
                         <form style="text-align: center;">
                          <el-row >
                            <el-col :span='16' :offset="4"  >
                                <el-input type="text" placeholder="请输入编号" v-model="id">
                                <template slot="prepend">编号：</template>
                            </el-input>
                            </el-col>
                        </el-row>   
                        <br>
                        <el-row >
                            <el-col :span='16' :offset="4"  >
                                <el-input type="text" placeholder="请输入类名" v-model='name'>
                                <template slot="prepend">类名：</template>
                            </el-input>
                            </el-col>
                        </el-row>   
                        <br>
                    </form>
                        <div slot="footer" class="dialog-footer">
                            <el-button @click="dialogFormVisible = false">取 消</el-button>
                            <el-button type="primary" @click="insert">确 定</el-button>
                        </div>
                        </el-dialog>
            <!-- </el-row> -->
                <br>
                <el-row>
                    <el-table :data='cate'>
                        <el-table-column label='编号' prop='id'></el-table-column>
                        <el-table-column label='类名' prop='name'></el-table-column>
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
                                <el-button type='success' @click='update(scope.row)'>修改</el-button> 
                                <el-button type='danger'  @click='del(scope.row.id)'>删除</el-button>
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
                    <el-input v-model='a_name'>
                        <template slot="prepend">类名：</template>
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
            cate:[],
            a_id:'',
            a_name:'',
            a_day:'',
            id:'',
            name:'',
            logo:false,
            dialogFormVisible: false,
        form: {
        //   name: '',
          region: '',
          date1: '',
          date2: '',
          delivery: false,
          type: [],
          resource: '',
          desc: ''
        },
         formLabelWidth: '120px',
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
            this.$axios.post('http://localhost:8859/in/cateall').then(res=>{
                let a=[];
                for(let i=0;i<res.data.length;i++)
                    {
                        res.data[i]['options']=['修改','删除'];
                        a[i]={
                            value:i+1,
                            name:res.data[i].name
                        }
                    }
                    var b=JSON.stringify(a)
                    localStorage.setItem('catename',b);
                    this.cate=res.data;
                    //this.userList=res.data;
            })
        },
        insert:function(){
            let data={
                id:this.id,
                name:this.name,
            }
            this.$confirm('确认添加?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('http://localhost:8859/in/cateadd',data).then(res=>{
                    this.id='';
                    this.name='';
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
                this.$axios.post('http://localhost:8859/in/catedel',data).then(res=>{
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
                this.a_name=per.name;
                this.a_day=per.created_at
            },
        cancel:function(){
                this.logo=false;
            },
        arevise:function(){
            let data={
                id:this.a_id,
                        name:this.a_name,
                        created_at:this.a_day
            }
            this.$confirm('确认修改?', '提示', {
                confirmButtonText: '确定',
                cancelButtonText: '取消',
                type: 'warning'
            }).then(() => {
                this.$axios.post('http://localhost:8859/in/catearevise',data).then(res=>{
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
.tit{
    position: absolute;
    top:5%;
    left: 30%;
    font-size: 40px;
    font-weight: 800;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
}
</style>