// hello there if you are looking at this code forgive me this code is done in a hurry dosent have proper passes that you would expect from a compiler
// and it is riddled with edge cases ,hey im still learning T_ 
function exp_err(a,b,c){
    alert("expecting "+a+" got "+b+" at line "+c);
    location.reload();
}

function eof_pars(){
    alert("unexpected eof while parsing @ line"+nl_cnt);
    location.reload();
}
function noop(){
    alert("no opperation specified at "+nl_cnt);
    location.reload();
}

function unsignedLEB128(n) {
    const buffer = [];
    do {
      let byte = n & 0x7f;
      n >>>= 7;
      if (n !== 0) {
        byte |= 0x80;
      }
      buffer.push(byte);
    } while (n !== 0);
    return buffer;
  };
  



function leb128(n){
    const buffer = [];
   let more = true;
   const isNegative = n < 0;
   const bitCount = Math.ceil(Math.log2(Math.abs(n))) + 1;
   while (more) {
     let byte = n & 0x7f;
     n >>= 7;
     if (isNegative) {
       n = n | -(1 << (bitCount - 8));
     }
     if ((n === 0 && (byte & 0x40) === 0) || (n === -1 && (byte & 0x40) !== 0x40)) {
       more = false;
     } else {
       byte |= 0x80;
     }
     buffer.push(byte);
   }
   return buffer;
 }

var shunting_num={
incr_decr:0,
unaryexclminus:1,
multidiv:2,
leq:3,
equa:4,
logiand:5,
logior:6
};

class assign_node{
constructor(){
    this.node_type = nodes.assign;
    this.ident=null;
    this.equals=null;
    this.nodenum=0;

}}
class simp_expr{
    constructor(x){
        this.q=x;
    }
}
class out_node{
    constructor(a,b){
        this.node_type = nodes.out_node;
        this.a=a;
        this.b=b;
    }
}
class expr_node{
    constructor(val){
        this.node_type=nodes.expr;
        this.val=val;
    }
}


//structuredClone(original);

    class dcl_node{
        constructor(type,ident,val,node_type){
    this.node_type=node_type;
    this.type = type; 
    this.ident=ident;
    this.val=val;}
    }

    class function_node{
    constructor(type,name,params,node_type,stmts,lvar){
        this.node_type=node_type;
    this.type=type;
    this.ident=name;
    this.params=params;
    this.body = stmts;
    this.lvars= lvar;
    this.parlen = params.length;
    this.lvarlen = lvar.length;
    }
    }

function parse_call(a,b){
var lis = [];

}

function parse_simpstmt(a,b){
    var statecnt = 0;
    var stack =  [];
    var q =  [];
    var stckvar=-1 ;
    var qvar=-1 ;   
    var qend=-1 ; 
    var czech = function(){
        var invalid = [


            tokens.T_COMMA,
            
            tokens.T_EXTERN,

            
            tokens.T_VOID,
            tokens.T_CHAR_DECL,
            tokens.T_INT_DECL,
            tokens.T_CURL_OP,
            tokens.T_CURL_CLO,
            tokens.T_IF,
            tokens.T_ELSE,
            tokens.T_WHILE,
            tokens.T_FOR,
            tokens.T_ASSIGN,
            tokens.T_RET,


            tokens.T_sqb_OP,
            tokens.T_sqb_CLO
        
        ];
        for(var i = 0 ; i< invalid.length; i++){
            if(k.type == invalid[i]){
                return 1;
            }
        }
        return 0;
    }
    var push= function(z){
        stckvar = stckvar +1;
        stack[stckvar] = z;
    }

    var pop = function(){
        if(stckvar == -1 ){
            return null;
        }
        else{
            var retval = stack[stckvar];
            stckvar = stckvar - 1;
            return retval;
        }
    }

    var peek = function(){
        if(stckvar == -1 ){
            return null;
        }
        return stack[stckvar];
    }

    var enq= function(z){
      if(qvar == -1){
        qvar = qvar + 1;
        qend = qend + 1;
        q[qend] = z;
      }
      else{
        qend = qend + 1;
        q[qend] = z;
      }
    }   
    var deq= function(){
        if(qvar == -1){
            return null;
        }
        else{
            var ree = q[qvar];
            qvar = qvar +1;
            return ree;
        }
    }

    var peeq= function(){
        if(qvar == -1){
            return null;
        }
        else{
            return q[qvar];
        }
    }
    var noob = function(){
        var valid = [
            tokens.T_IDENT,
            tokens.T_INT_LIT,
            tokens.T_BRACK_CLO,
            tokens.T_DECR,
            tokens.T_INCR,
            tokens.T_MINUS,
            tokens.T_EXLM
        ];
        for(var i = 0 ; i< valid.length; i++){
            if(k.type == valid[i]){
                return 1;
            }
        }
        return 0;
    }
    var incrchk = function(){
         var inv = [
            tokens.T_DECR,
            tokens.T_INCR,
         ]
    }
    if(a == null){
        while(1){
            if(statecnt == 2){
                statecnt =0;
            }
            if(b.type == tokens.T_LOGIOR){
                  if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }
            }
            else if(b.type == tokens.T_LOGIAND){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR ){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }
            else if(b.type == tokens.T_EQUALITY){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND ){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }
            else if(b.type == tokens.T_NOTEQL){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND ){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }
            else if(b.type == tokens.T_LESS){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY ){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }  
            else if(b.type == tokens.T_LESSEQL){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY ){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }
            else if(b.type == tokens.T_GREATER){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY ){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }
            else if(b.type == tokens.T_GREATEQL){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY ){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }
 
            else if(b.type == tokens.T_PLUS){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY || peek() == tokens.T_GREATEQL|| peek() == tokens.T_GREATER || peek() == tokens.T_LESS || peek() == tokens.T_LESSEQL){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }     
            else if(b.type == tokens.T_MINUS){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY || peek() == tokens.T_GREATEQL|| peek() == tokens.T_GREATER || peek() == tokens.T_LESS || peek() == tokens.T_LESSEQL){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }     
            else if(b.type == tokens.T_MUL){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY || peek() == tokens.T_GREATEQL|| peek() == tokens.T_GREATER || peek() == tokens.T_LESS || peek() == tokens.T_LESSEQL|| peek()== tokens.T_PLUS|| peek()== tokens.T_MINUS){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            } 
            else if(b.type == tokens.T_DIV){
                if(statecnt == 0){
                    noop();
                  }
                  statecnt = 0;
                  while(1){
                    if(peek()==tokens.T_sqb_OP || peek()== Null || peek()==tokens.T_LOGIOR || peek() == tokens.T_LOGIAND || peek() == tokens.T_NOTEQL ||  peek() == tokens.T_EQUALITY || peek() == tokens.T_GREATEQL|| peek() == tokens.T_GREATER || peek() == tokens.T_LESS || peek() == tokens.T_LESSEQL|| peek()== tokens.T_PLUS|| peek()== tokens.T_MINUS){ 
                        push(b);
                        break;
                    }
                    else{
                        enq(pop());
                    }
                  }


            }
            else if(b.type == tokens.T_INT_LIT){
                if(statecnt == 1){
                    noop();
                  }
                  statecnt = 1;
                enq(b);


            }    
            else if(b.type == tokens.T_INT_LIT){
                if(statecnt == 1){
                    noop();
                  }
                  statecnt = 1;
                enq(b);
                
            }
            else if(b.type == tokens.T_BRACK_OP) {
                if(statecnt == 1){
                    noop();
                  }
                else{
                    push(b);
                }  

            }
            else if(b.type == tokens.T_BRACK_CLO){
                if(statecnt == 0){
                    noop();
                  }
                while(1){
                    if(peek().type == tokens.T_BRACK_OP){
                        pop();
                        break;
                    }
                    else{
                        enq(pop());
                    }
                }
            }
            else if(b.type == tokens.T_SEMICOLON){
                if(statecnt == 1){
                    noop();
                  }
                else{
                    while(1){
                        var xt = pop();
                        if(xt == null){
                           break;
                        }
                        else{
                            enq(xt);
                        }
                    return new simp_expr(q);
                }  
            }
        }
        else{
            noop();
        }
          b = get_token();
          if(b.type==tokens.T_EOF){eof_pars();}
        }
    }
    







}


function parse_expr(k){ 
    var trak = -1;
    var assign = new assign_node;
    var x,stat=0,a=-1,ptr,init,asgn;
    while(1){
        a=a+1;
        x = get_token();
        if(x.type==tokens.T_EOF){eof_pars();}
        if(a==0){
            if(x.type==tokens.assign){
                asgn = structuredClone(assign);
                asgn.ident = k.ident;
                ptr = asgn;
                init = asgn;
                stat =1;
            }
            else if(x.type==tokens.T_SEMICOLON){
                if(stat == 1){
                    exp_err("identifier/assignment",debug[x.type],nl_cnt);
                }
                else{
                       return new expr_node(init);
                }
            }
            else if(x.type==tokens.T_IDENT){
                exp_err("assign/simple expression/;",debug[x.type],nl_cnt);
            }
            else if(x.type==tokens.T_BRACK_OP){
                return parse_simpstmt(1,k);
            }

        }
        else{
            if(x.type==tokens.assign){
                stat =1;
            }
            else if(x.type==tokens.T_IDENT && stat == 1){
                asgn = structuredClone(assign);
                asgn.ident = x.ident;
                asgn.nodenum=a;
                ptr.equals=asgn;
                ptr = asgn;
                stat =0;
            }
            else if(x.type==tokens.T_IDENT && stat == 0){
                exp_err("assign/simple expression/;",debug[x.type],nl_cnt);
            }
            
            else if(x.type==tokens.T_SEMICOLON){
                if(stat == 1){
                    exp_err("identifier/assignment",debug[x.type],nl_cnt);
                }
                else{
                       return new expr_node(init);
                }
            }
            else if(x.type==tokens.T_BRACK_OP){
                if(stat == 0){
                return parse_simpstmt(1,k);
                }
            }
        }

    }

}



/*
   var temp_type,temp_ID,TEMP_NUM;
    var a = -1; var pt,init;
    if(k.type == tokens.T_IDENT){
        temp_ID = k.ident;
        while(1){
            var asgn = structuredClone(assign);
            a = a+1;
            x=get_token();
            toknum=toknum+1;
            if(x.type==tokens.T_EOF){eof_pars();}
            else if(x.type==tokens.T_ASSIGN){
                if (a == 0 ){
                    asgn.ident = k.ident;
                    ptr = asgn;
                    init = asgn;
                    continue;
                }
                else{

                       ptr.equals = x;

                }    

        }
        else if(x.type==tokens.T_IDENT){
            if (a == 0 ){
                exp_err("simple expression or assignment",x.type,nl_cnt);
            }

            else{
                temp_ID = x.ident;
            }




        }


    }
    }*/

function parse_dcl(k){
        var temp_type,temp_ID,TEMP_NUM;
        temp_type=k;
        x=get_token();
        toknum=toknum+1;
        if(x==tokens.T_EOF){eof_pars();}
        else if(x.type==tokens.T_IDENT){
            temp_ID=x.ident;
        }
        x=get_token();
        toknum=toknum+1;
        if(x==tokens.T_EOF){eof_pars();}
        else if(x.type==tokens.T_SEMICOLON){
            return new dcl_node(temp_type,temp_ID,0,nodes.func_local_vars);
        }
        else{
            exp_err("IDENTIFIER",debug[x.type],nl_cnt);
        }
    }


function parse_out(){
    var x;
    x=get_token();
    var m = x.val;
    if(x==tokens.T_EOF){eof_pars();}
    else if(x.type == tokens.T_INT_LIT){
        var z;
        z=get_token();
        var n = z.val;
        if(z==tokens.T_EOF){eof_pars();}
        else if(z.type == tokens.T_INT_LIT){
            var j;
            j = get_token();
            if(j==tokens.T_EOF){eof_pars();}
            else if(j.type == tokens.T_SEMICOLON){
                
                   return new out_node(m,n);
            }
            else{
                exp_err("T_SEMICOLON",x.type,nl_cnt)
            }

        }
        else{
            exp_err("T_INT_LIT",x.type,nl_cnt)
        }
    }
    else{
        exp_err("T_INT_LIT",x.type,nl_cnt)
    }
}

function parse_stmt(k){
    var stmt;
        if(k==tokens.T_CURL_CLO){
        return null;
        }
        else if(k.type==tokens.T_IDENT){
              stmt = parse_expr(k);
             return stmt;
        }
        else if(k.type==tokens.T_OUT){
            return parse_out();
        }




        else{
            stmt = parse_simpstmt(null,k);
            return stmt;
        }
        
    }



    
function type_specifier(){
var x = get_token();
toknum=toknum+1;
if(x==tokens.T_EOF){eof_pars();}
else if((x.type == tokens.T_VOID)||(x.type == tokens.T_CHAR_DECL)||(x.type == tokens.T_INT_DECL)){
    //console.log(debug[x.type]);
    return x.type;


}
else{
   
    exp_err("Type",debug[x.type],nl_cnt); 
}
//token_handle(x);

}


function parse_params(){
param_lis=[];
var temp_ID;
while(1){
var y = type_specifier();  

var x = get_token();
toknum=toknum+1;
if(x.type==tokens.T_EOF){eof_pars();}
else if((y==tokens.T_VOID) && (param_lis.length == 0) ){
if(x.type==tokens.T_BRACK_CLO){break;}
else if(x.type==tokens.T_IDENT){
    temp_ID = x.ident;
    var x = get_token();
    toknum=toknum+1;
    if(x.type==tokens.T_EOF){eof_pars();}
    else if(x.type==tokens.T_COMMA){
        param_lis.push(new dcl_node(y,temp_ID,0,nodes.Param_dcl));
        continue
    }
    else if(x.type==tokens.T_BRACK_CLO){
        param_lis.push(new dcl_node(y,temp_ID,0,nodes.Param_dcl));
        break;
    }
    else{
        exp_err(", or )",debug[x.type],nl_cnt); 
    }
}
else{
    exp_err("IDENTIFIER OR )",debug[x.type],nl_cnt); 
}
}
else if((y==tokens.T_VOID) && (param_lis.length != 0) ){
    if(x.type==tokens.T_BRACK_CLO){
        alert("expecting empty params specified by void @ "+nl_cnt);
        location.reload();

    }
    
    else if(x.type==tokens.T_IDENT){
        temp_ID = x.ident;
        var x = get_token();
        toknum=toknum+1;
        if(x.type==tokens.T_EOF){eof_pars();}
        else if(x.type==tokens.T_COMMA){
            param_lis.push(new dcl_node(y,temp_ID,0,nodes.Param_dcl));
            continue
        }
        else if(x.type==tokens.T_BRACK_CLO){
            param_lis.push(new dcl_node(y,temp_ID,0,nodes.Param_dcl));
            break;
        }
        else{
            exp_err(", or )",debug[x.type],nl_cnt); 
        }
    }
    else{
        exp_err("IDENTIFIER OR )",debug[x.type],nl_cnt); 
    }

    }
else{


    if(x.type==tokens.T_IDENT){
        temp_ID = x.ident;
        var x = get_token();
        toknum=toknum+1;
        if(x.type==tokens.T_EOF){eof_pars();}
        else if(x.type==tokens.T_COMMA){
            param_lis.push(new dcl_node(y,temp_ID,0,nodes.Param_dcl));
            continue
        }
        else if(x.type==tokens.T_BRACK_CLO){
            param_lis.push(new dcl_node(y,temp_ID,0,nodes.Param_dcl));
            break;
        }
        else{
            exp_err(", or )",debug[x.type],nl_cnt); 
        }
    }
    else{
        exp_err("IDENTIFIER",debug[x.type],nl_cnt); 
    }

}    

}

return param_lis;
}






function parse_func(temp_type,temp_ID){
    var param_lis;
 
    var lvars=[];
    var universe=[];
    var obn;
    var stmt_lis=[]
    param_lis = parse_params();

    var x = get_token();
    toknum=toknum+1;
    if(x==tokens.T_EOF){eof_pars();}
    else if(x.type == tokens.T_CURL_OP){
        
    
    }
    else {
        exp_err("{",debug[x.type],nl_cnt);
    }
    while(1){
    var x = get_token();
    toknum=toknum+1;
    if(x==tokens.T_EOF){eof_pars();}
    else if(x.type == tokens.T_CURL_CLO){
        //alert("detected");
    return new function_node(temp_type,temp_ID,param_lis,nodes.Func_decl,stmt_lis,lvars);
    }
    else if((x.type == tokens.T_VOID)||(x.type == tokens.T_CHAR_DECL)||(x.type == tokens.T_INT_DECL)){
        obn= parse_dcl(x.type);
        universe.push(obn);
        lvars.push(obn);
    }
      
    else {
        obn= parse_stmt(x);
        universe.push(obn);
        stmt_lis.push(obn);
    }
    check_lvars(param_lis,lvars);
    
}
    
return new function_node(temp_type,temp_ID,param_lis,nodes.Func_decl,stmt_lis,lvars);








}





function parse_dcl_func(k){
    var temp_type,temp_ID,TEMP_NUM;
    //var x=type_specifier();
    //if(loca==(srccode.length)){return tokens.T_EOF;}
    temp_type = k;
    var x = get_token();
   // console.log(debug[x.type]);
    //console.log(debug[x.type],loca);
    //token_handle(x);
    toknum=toknum+1;
    if(x==tokens.T_EOF){return tokens.T_INCOMPLETE;}
    else if(x.type == tokens.T_IDENT){
        temp_ID=x.ident;
      }
    else{
        exp_err("identifier",debug[x.type],nl_cnt);
    }
    x = get_token();
    //token_handle(x);   
    toknum=toknum+1;
    if(x==tokens.T_EOF){return tokens.T_INCOMPLETE;}
    else if(x.type==tokens.T_sqb_OP) {
        
        x = get_token();
        //token_handle(x);   
        toknum=toknum+1;
        if(x==tokens.T_EOF){return tokens.T_INCOMPLETE;}
        else if(x.type==tokens.T_INT_LIT){
            TEMP_NUM=x.val;
            x = get_token();
            //token_handle(x);   
            toknum=toknum+1;
            if(x==tokens.T_EOF){return tokens.T_INCOMPLETE;}
            else if(x.type==tokens.T_sqb_CLO){ 
                return dcl_node(temp_type,temp_ID,TEMP_NUM,0);
            }
            else{
                exp_err("T_sqb_CLO",debug[x.type],nl_cnt);
            }
        }
        else{ exp_err("T_INT_LIT",debug[x.type],nl_cnt); }
    }
    else if(x.type==tokens.T_SEMICOLON){ return new dcl_node(temp_type,temp_ID,0,nodes.Glob_var); }
     
    else if(x.type==tokens.T_BRACK_OP){

        return parse_func(temp_type,temp_ID);
    }

    else{ //exp_err("T_INT_LIT",debug[x.type],nl_cnt);
       
        exp_err(";",debug[x.type],nl_cnt); 
    
    
    }
    
    
}


var toknum=-1;
var toksto=[];
var asts=[];
function parse(){

while(1){

    x=get_token();
    toknum=toknum+1;
    if(x==tokens.T_EOF){break;}
    else if((x.type == tokens.T_VOID)||(x.type == tokens.T_CHAR_DECL)||(x.type == tokens.T_INT_DECL)){
        var obn= parse_dcl_func(x.type);
        if(obn==tokens.T_INCOMPLETE){eof_pars();}
        else{ 
        asts.push(obn);}
      }
    else{
        //alert("base")
        exp_err("type",debug[x.type],nl_cnt);
        
    }
    

}
console.log(asts);
asts.forEach(semantic_);
gen_code();
}











/* to do

re decl func czech

*/

































/*else if(x.type == tokens.T_IDENT){
    temp_ID=x.ident;
  }
else if(x.type == tokens.T_BRACK_CLO)  {
     if((param_lis.length==0)&&y==tokens.T_VOID){
         break;
     }
     else{
        alert("expecting empty params specified by void @ "+nl_cnt);
        location.reload();
     }
}
else{
    exp_err("identifier or )",debug[x.type],nl_cnt);
}
x = get_token();
    //token_handle(x);   
    toknum=toknum+1;
    if(x.type==tokens.T_EOF){eof_pars();}

    else if(x==tokens.T_COMMA){
        var z = new dcl_node(y,temp_ID,0,1);
        param_lis.push(z);
        continue;
    }
    else if(x.type==tokens.T_BRACK_CLO){
        var z = new dcl_node(y,temp_ID,0,1);
        param_lis.push(z);
        break;
    }
    else{
        exp_err(", or )",debug[x.type],nl_cnt);
    }



}
return param_lis;*/


    /*
    if(loca==(srccode.length)){break;}
    var x= parse_dcl();
    if(x==tokens.T_EOF){ break;}
    else if(x==false){
        x=parse_func();
        

    }*/





//console.log(asts);
//asts.forEach(semantic_);


/*
function parse_dcl(){
      var temp_type,temp_ID,TEMP_NUM;
      var x=get_token();
      toknum=toknum+1;
      if((x.type == tokens.T_VOID)||(x.type == tokens.T_CHAR_DECL)||(tokens.T_INT_DECL)){
        temp_type = x.type;
      }
      else{
          if((x.type == tokens.T_SPACE)||(x.type == tokens.T_CR)||(x.type == tokens.T_NL)){
              return parse_dcl();
          }
          else{
        exp_err("type",debug[x.type],nl_cnt); }
      }
      x=get_token();
      toknum=toknum+1;
      if((x.type == tokens.T_IDENT)){
        temp_ID = x.ident;
      }
      else{
          if((x.type == tokens.T_SPACE)||(x.type == tokens.T_CR)||(x.type == tokens.T_NL)){
              return parse_dcl();
          }
          else{
        exp_err("identifier",debug[x.type],nl_cnt); }
      }
      x=get_token();
      toknum=toknum+1;
      if((x.type == tokens.T_SEMICOLON)){

        temp_ID = x.ident;
      }
      else{
          if((x.type == tokens.T_SPACE)||(x.type == tokens.T_CR)||(x.type == tokens.T_NL)){
              return parse_dcl();
          }
          else if(x==tokens.T_sqb_OP){
            x=get_token();
            toknum=toknum+1;
            if(x==tokens.T_INT_LIT){
                TEMP_NUM = x.val;
            }
            else{
                exp_err("int lit",debug[x.type],nl_cnt);
            }
            x=get_token();
            toknum=toknum+1;
            if(x==tokens.T_sqb_CLO){
                x=get_token();
            toknum=toknum+1;
                if(x==tokens.T_SEMICOLON){
                   return dcl_node(temp_type,temp_ID,TEMP_NUM,0);
               }
               else{
                exp_err(";",debug[x.type],nl_cnt);
               }
            }
            else{
                exp_err("int lit",debug[x.type],nl_cnt);
            }
       // exp_err("identifier",debug[x.type],nl_cnt);
     }
     

      }
    

            var y = structuredClone(assign);



                var assipar = structuredClone(original);



    class expr{
          constrctor(k){

              
          }
    }




}

||(b.type == tokens.T_GREATEQL) || (b.type == tokens.T_GREATER) || (b.type == tokens.T_LESS) || (b.type == tokens.T_LESSEQL) || (b.type == tokens.T_LOGIAND) || (b.type == tokens.T_LOGIOR) || (b.type == tokens.T_MINUS) || (b.type == tokens.T_MUL) || (b.type == tokens.T_NOTEQL) || (b.type == tokens.T_)
*/

/* hhhhhhhhhhhhh
if(b.type == tokens.T_BRACK_OP) {
            push(b);
            b = get_token();
            if(b.type==tokens.T_EOF){eof_pars();}
            else if(noob (b) == 0){
                noop();
            }
            else{
                continue;
            }
          }
          else if(b.type == tokens.T_BRACK_CLO){
              
              while(1){
                var temp = pop();
                if(temp == null){
                    exp_err(')',temp,nl_cnt);
                }
                else if(temp.type == tokens.T_BRACK_OP){
                    b = get_token();
                    if(b.type==tokens.T_EOF){eof_pars();}
                    else if( czech (b) == 1){
                        noop();
                    }
                    else{
                        continue;
                    }
                }
                else{
                    enq(b);
                    b = get_token();
                    if(b.type==tokens.T_EOF){eof_pars();}
                    else if(czech (b) == 1){
                        noop();
                    }
                    else{
                        continue;
                    }
                }
              } 
          }
          else if(b.type == tokens.T_INT_LIT){
              enq(leb128(b.val));
              b = get_token();
                    if(b.type==tokens.T_EOF){eof_pars();}
                    else if(czech (b) == 1){
                        noop();
                    }
                    else{
                        continue;
                    }
          }
          else if(b.type == tokens.T_IDENT){
            var tempoo = b;
            b = get_token();
            if(b.type==tokens.T_EOF){eof_pars();}
            else if(tempoo.type == tokens.T_sqb_OP){enq(parse_call())}
            else{
                if(czech (b) == 1){
                    noop();
                }
                else{
                    enq(tempoo);
                    continue;
                }     
            }
            b = get_token();
            if(b.type==tokens.T_EOF){eof_pars();}     
            else if(czech (b) == 1){
                noop();
            }
            else{
                continue;
            }      
        }
        else if(b.type == tokens.T_INCR){
                  while(peek().type != T_BRACK_OP ){
                      enq(pop());
                  }
                  b = get_token();
                  if(b.type==tokens.T_EOF){eof_pars();}
                  else if( incrchk() != 1){

                  }
        }

*/