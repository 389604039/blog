var express = require('express');
var router = express.Router();

//引入sql板块
var pool=require('../config/mysql')


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index');
  });
//登录接口
//登录按用户名查询
//http://localhost:8859/in/log
router.post('/log',function(req,res,next){
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败!')
        }
        else{
            let pass=req.body.password;
            let name=req.body.username;
            let data=[name,pass];
            console.log('数据库连接成功!');
            let sql="select * from admin where username=? and password=?"
            conn.query(sql,data,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                
                res.send(results);
                conn.release(); //释放
            })
        }
    })
})
//分类列表接口
//查询所有分类信息
//http://localhost:8859/in/cateall
router.post('/cateall',function(req,res,next){
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败!')
        }
        else{
            console.log('数据库连接成功!');
            let sql="select * from cate "
            conn.query(sql,function(error,results){
                if(error)
                {
                    console.log('查询失败')
                }
                res.send(results);
                conn.release(); //释放
            })
        }
    })
})

//单条分类信息接口
//按id查询分类信息
//http://localhost:8859/in/cateid
router.post('/cateid',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let sql='select * from cate where id=?'
            conn.query(sql,id,function(error,results){
                if(error)
                {
                    console.log('查询失败')
                }
                res.send(results);
                conn.release();
            })
        }
    })
    
})
//添加分类接口
//添加分类信息
//http://localhost:8859/in/cateadd
router.post('/cateadd',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let name=req.body.name;
            let creat=new Date();
            let update=new Date();
            let dat ={id:id,name:name,created_at:creat,updated_at:update}
            let sql='insert into cate set ?'
            conn.query(sql,dat,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('添加成功');
                conn.release();
            })
        }
    })
    
})
//修改分类接口
//修改分类信息
//http://localhost:8859/in/catearevise
router.post('/catearevise',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let name=req.body.name;
            let creat=req.body.created_at;
            let updated=new Date();
            let dat =[name,new Date(creat),new Date(updated),id]
            let sql='update cate set name=?,created_at=?,updated_at=? where id=?'
            // let sql='update cate set name=?,created_at=?,updated_at=? where id=?'
            conn.query(sql,dat,function(error,results){
                if(error)
                {
                    console.log(error);
                }
                res.send('修改成功');
                conn.release();
            })
        }
    })
    
})
//删除分类接口
//http://localhost:8859/in/catedel
router.post('/catedel',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
           
            let sql='delete from cate where id=?'
            conn.query(sql,id,function(error,results){
                if(error)
                {
                    console.log(error);
                }
                res.send('删除成功');
                conn.release();
            })
        }
    })
    
})		

//文章列表接口
//查询所有文章
//http://localhost:8859/in/articleall
router.post('/articleall',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            
            let sql='select * from article'
            conn.query(sql,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send(results);
                conn.release();
            })
        }
    })
    
})
//单条文章信息接口
//按id查询文章
//http://localhost:8859/in/articleid
router.post('/articleid',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let sql='select * from article where id=?'
            conn.query(sql,id,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send(results);
                conn.release();
            })
        }
    })
    
})
//添加文章接口
//添加文章
//http://localhost:8859/in/articleadd
router.post('/articleadd',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let title=req.body.title;
            let desc=req.body.a_desc;
            let content=req.body.content;
            let cate=req.body.cate;
            let creat=new Date();
            let dat ={id:id,title:title,a_desc:desc,content:content,cate:cate,created_at:creat}
            let sql='insert into article set ?'
            conn.query(sql,dat,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('添加成功');
                conn.release();
            })
        }
    })
    
})
//修改文章接口
//http://localhost:8859/in/articlearevise
router.post('/articlearevise',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let title=req.body.title;
            let a_desc=req.body.a_desc;
            let content=req.body.content;
            let cate=req.body.cate;
            let creat=req.body.created_at;
            let updated=new Date();
            let dat=[title,a_desc,content,cate,new Date(creat),new Date(updated),id]
            let sql='update article set title=?,a_desc=?,content=?,cate=?,created_at=?,updated_at=? where id=?'
            conn.query(sql,dat,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('修改成功');
                conn.release();
            })
        }
    })
    
})
//删除文章接口
//http://localhost:8859/in/articledel
router.post('/articledel',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
           
            let sql='delete from article where id=?'
            conn.query(sql,id,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('删除成功');
                conn.release();
            })
        }
    })
    
})		
//查看博客信息接口
//查看所有的博客信息
//http://localhost:8859/in/infoall
router.post('/infoall',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let sql='select * from info'
            conn.query(sql,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send(results);
                conn.release();
            })
        }
    })
    
})		
//修改博客信息接口
//http://localhost:8859/in/infoarevise
router.post('/infoarevise',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let title=req.body.title;
            let subtitle=req.body.subtitle;
            let about=req.body.about;
            let created_at=req.body.created_at;
            let updated_at=new Date()
            let dat=[title,subtitle,about,new Date(created_at),new Date(updated_at),id]
            let sql='update info set title=?,subtitle=?,about=?,created_at=?,updated_at=? where id=?'
            conn.query(sql,dat,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('修改成功');
                conn.release();
            })
            
        }
    })
    
})		
//管理员列表接口
//查看所有管理员
//http://localhost:8859/in/adminall
router.post('/adminall',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let sql='select * from admin'
            conn.query(sql,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send(results);
                conn.release();
            })
        }
    })
    
})				
//单条管理员信息接口
//管理单条信息
//http://localhost:8859/in/adminid
router.post('/adminid',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let sql='select * from admin where id=?'
            conn.query(sql,id,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send(results);
                conn.release();
            })
        }
    })
    
})			
//添加管理员接口
//http://localhost:8859/in/adminadd
router.post('/adminadd',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let username=req.body.username;
            let password=req.body.password;
            let name=req.body.name;
            let role=req.body.role;
            let created_at=new Date();
            let dat={id:id,username:username,password:password,name:name,role:role,created_at:created_at}
            let sql='insert into admin set ?'
            conn.query(sql,dat,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('添加成功');
                conn.release();
            })
        }
    })
    
})		
//修改管理员接口
//http://localhost:8859/in/adminarevise
router.post('/adminarevise',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let username=req.body.username;
            let password=req.body.password;
            let name=req.body.name;
            let role=req.body.role;
            let created_at=req.body.created_at;
            let updated_at=new Date();
            let dat=[username,password,name,role,new Date(created_at),new Date(updated_at),id]
            let sql='update admin set username=?,password=?,name=?,role=?,created_at=?,updated_at=? where id=?'
            conn.query(sql,dat,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('修改成功');
                conn.release();
            })
        }
    })
    
})				
//删除管理员接口
//http://localhost:8859/in/admindel
router.post('/admindel',function(req,res,next)
{
    pool.getConnection(function(err,conn)
    {
        if(err)
        {
            console.log('连接数据库失败')
        }
        else{
            console.log('连接数据库成功')
            let id=req.body.id;
            let sql='delete from admin where id=?'
            conn.query(sql,id,function(error,results){
                if(error)
                {
                    console.log(error)
                }
                res.send('删除成功');
                conn.release();
            })
        }
    })
    
})	


module.exports = router;
