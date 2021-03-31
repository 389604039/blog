<template>
<el-container>
 <div id="app">
        <el-container>
            <el-header height='60px'>
                <h2>布局栏</h2>
            </el-header>
        </el-container>
        <el-container>
            <el-aside width='180px'> 侧边栏</el-aside>
            <el-main>
                <el-row> 
                   
                    <form>
                        <el-col :span='10' class="col1" style="margin-left: 20px;">
                            <el-input type="text" placeholder="请输入编号" v-model="id">
                                <template slot="prepend">编号：</template>
                            </el-input>
                        </el-col>
                        <el-col :span='10' class="col2" style="margin-left: 20px;">
                            <el-input type="text" placeholder="请输入类名" v-model='name'>
                                <template slot="prepend">类名：</template>
                            </el-input>
                        </el-col>
                        <el-button type='success' @click='insert' style="margin-left: 20px;">添加</el-button>
                    </form>
                </el-row>
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
        <el-container>
            <el-footer>底边栏</el-footer>
        </el-container>
        <div v-show='logo' class="zhe">
            <div class="nei">
                
                <form>
                    <h4>修改</h4>
                    <el-input v-model='a_id' readonly >
                        <template slot="prepend">编号：</template>
                    </el-input>
                    <br>
                    <br>
                    <el-input v-model='a_name'>
                        <template slot="prepend">类名：</template>
                    </el-input>
                    <br>
                    <br>
                    <br>
                    <el-button type='success' @click='arevise' style="margin-left: 20px;">确认</el-button>
                    <el-button  @click='cancel' style="margin-left: 20px;">取消</el-button>
                </form>
            </div>
            
        </div>
    </div>
</el-container>
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
            logo:false
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
                for(let i=0;i<res.data.length;i++)
                    {
                        res.data[i]['options']=['修改','删除'];
                    }
                    this.cate=res.data;
                    //this.userList=res.data;
            })
        },
        insert:function(){
            let data={
                id:this.id,
                name:this.name,
            }
            this.$axios.post('http://localhost:8859/in/cateadd',data).then(res=>{
                this.id='';
                this.name='';
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
            this.$axios.post('http://localhost:8859/in/catedel',data).then(res=>{
                this.creat();
            }).catch(error=>{
                console.log(error)
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
            this.$axios.post('http://localhost:8859/in/catearevise',data).then(res=>{
                alert('确认修改');
                    this.logo=false;
                    this.creat(); 
            }).catch(error=>{
                    console.logo(error)
                })
        }
    }

}
</script>

<style>
body {
      margin: 0;
      height: 100%;
    }
#app{
    margin: 0;
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
.col1{
    
    text-align: center;
}
.tab1{
    margin-left:10px ;
}

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