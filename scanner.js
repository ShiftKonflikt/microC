// hello there if you are looking at this code forgive me this code is done in a hurry dosent have proper passes that you would expect from a compiler
// and it is riddled with edge cases ,hey im still learning T_ 

var srccode=document.getElementById("editor").value;

var tokens ={  
        T_IDENT:0,
        T_INT_LIT:1,
        T_COMMA:2,
        T_SEMICOLON:3,
        T_EXTERN:4,
        T_BRACK_OP:5,
        T_BRACK_CLO:6,
        T_VOID:7,
        T_CHAR_DECL:8,
        T_INT_DECL:9,
        T_CURL_OP:10,
        T_CURL_CLO:11,
        T_IF:12,
        T_ELSE:13,
        T_WHILE:14,
        T_FOR:15,
        T_ASSIGN:16,
        T_RET:17,
        T_MINUSm:18,
        T_EXLM:19,
        T_INCR:20,
        T_DECR:21,
        T_PLUS:22,
        T_MINUS:23,
        T_DIV:24,
        T_EQUALITY:25,
        T_NOTEQL:26,
        T_LESSEQL:27,
        T_LESS:28,
        T_GREATEQL:29,
        T_GREATER:30,
        T_LOGIAND:31,
        T_LOGIOR:32,
        T_SPACE:33,
        T_EOF:34,
        T_SPACE:35,
        T_CR:36,
        T_MUL:37,
        T_sqb_OP:38,
        T_sqb_CLO:39,
        T_NL:40,
        T_INCOMPLETE:41
        
};

var nodes ={

          Glob_var:0,
          Func_decl:1,
          Param_dcl:3,
          func_local_vars:4,
          assign:5,
          expr:6,
          simple_expr:7


};




nl_cnt=0;






const debug =[

        "T_IDENT",
        "T_INT_LIT",
        "T_COMMA",
        "T_SEMICOLON",
        "T_EXTERN",
        "T_BRACK_OP",
        "T_BRACK_CLO",
        "T_VOID",
        "T_CHAR_DECL",
        "T_INT_DECL",
        "T_CURL_OP",
        "T_CURL_CLO",
        "T_IF",
        "T_ELSE",
        "T_WHILE",
        "T_FOR",
        "T_ASSIGN",
        "T_RET",
        "T_MINUS",
        "T_EXLM",
        "T_INCR",
        "T_DECR",
        "T_PLUS",
        "T_MINUS",
        "T_DIV",
        "T_EQUALITY",
        "T_NOTEQL",
        "T_LESSEQL",
        "T_LESS",
        "T_GREATEQL",
        "T_GREATER",
        "T_LOGIAND",
        "T_LOGIOR",
        "T_SPACE",
        "T_EOF",
        "T_SPACE",
        "T_CR",
        "T_MUL",
        "T_sqb_OP",
        "T_sqb_CLO"


]
function printf(vall){
        alert(vall);
}
//I WILL NOT USE REGEX

function isalpha(ch){
        if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")){
            return true;
        }

}

function isalnum(ch){
        if ((ch >= "A" && ch <= "Z") || (ch >= "a" && ch <= "z")|| (ch >= "0" && ch <= "9")){
            return true;
        }

}

function isdigit(ch){
        if ((ch >= "0" && ch <= "9")){
            return true;
        }

}

function  keywrd(val){

   if(val == "extern"){
                return tokens.T_EXTERN;
            }
   else if(val=="void"){
                return tokens.T_VOID;
            }
   else if(val=="int"){
                return tokens.T_INT_DECL;
            }
   else if(val=="char"){
                return tokens.T_CHAR_DECL;
            }

   else if(val=="if"){
                return tokens.T_IF;
            }
   else if(val=="else"){
                return tokens.T_ELSE;
            }
   else if(val=="while"){
                return tokens.T_WHILE;
            }
   else if(val=="for"){
                return tokens.T_FOR;
            }
   else if(val=="return"){
                return tokens.T_RET;
            }
   else{ return -1;}  

}

var loca=-1;

function parse_ident(ch){
var iden="";keep=1;
iden=iden+ch;

while(1){   
loca =loca +1;  
if(loca >= srccode.length){break;}           
var chh = srccode[loca];
if(keep >= 30){continue;}
else if(((isalnum(chh)) == true) || ch == '_' ){iden=iden+chh;}
else{break;}
keep=keep+1;
}loca=loca-1;
return iden;

}

function parse_int(ch){
        var iden="";keep=1;
        iden=iden+ch;
        
        while(1){   
        loca =loca +1;  
        if(loca == srccode.length){break;}           
        var chh = srccode[loca];
        if(keep >= 30){continue;}
        else if(((isdigit(chh)) == true) ){iden=iden+chh;}
        else{break;}
        keep=keep+1;
        } loca=loca-1;
        return parseInt(iden);
        
        }





function make_node(type,ident,val) {
        this.type = type;
        this.ident=ident;
        this.val=val;
        return this;
    };

function get_token(){
loca = loca +1;        
var iden_temp;        
var ch = srccode[loca];
if(loca==(srccode.length)){return tokens.T_EOF;}
else if( (isalpha(ch)) ==true ){    iden_tem = parse_ident(ch);
var x = keywrd(iden_tem);
if(x<0){
        return make_node(tokens.T_IDENT,iden_tem,0) ;
        }
else{return make_node(x,iden_tem,0) ;}

//end of identifier detection
                       }

else if( (isdigit(ch)) ==true ){  var tem =  parse_int(ch); return make_node(tokens.T_INT_LIT,'\0',tem) ;}

else{
        switch (ch)
        {
        
        case ',':
             return make_node(tokens.T_COMMA,'\0',0);
        case ';':
             return make_node(tokens.T_SEMICOLON,'\0',0);
        case '(':
             return make_node(tokens.T_BRACK_OP,'\0',0); 
        case ')':
             return make_node(tokens.T_BRACK_CLO,'\0',0);  
        case '[':
                return make_node(tokens.T_sqb_OP,'\0',0); 
        case ']':
                return make_node(tokens.T_sqb_CLO,'\0',0);               
        case '{':
             return make_node(tokens.T_CURL_OP,'\0',0);
        case '}':
              return make_node(tokens.T_CURL_CLO,'\0',0);
        case '=':
        //fseek(lu,cupos+1,SEEK_CUR);
               var th = srccode[loca+1];
               if(th=='='){
                loca=loca+1;    

                   return make_node(tokens.T_EQUALITY,'\0',0);
               }
               else{
                   return make_node(tokens.T_ASSIGN,'\0',0);
               }
        case '-':

        //fseek(lu,cupos+1,SEEK_CUR);
        var th = srccode[loca+1];
        if(th=='-'){
                loca=loca+1;    

                   return make_node(tokens.T_DECR,'\0',0);
               }
               else{
                   return make_node(tokens.T_MINUS,'\0',0);
               }    
        //T_EXLM
        case '!':

        //fseek(lu,cupos+1,SEEK_CUR);
        var th = srccode[loca+1];
        if(th=='='){
                loca=loca+1;    

                   return make_node(tokens.T_NOTEQL,'\0',0);
               }
               else{
                   return make_node(tokens.T_EXLM,'\0',0);
               }
        case '+':
               var th = srccode[loca+1];
        //fseek(lu,cupos+1,SEEK_CUR);
               if(th=='+'){
                loca=loca+1;    

                   return make_node(tokens.T_INCR,'\0',0);
               }
               else{
                   return make_node(tokens.T_PLUS,'\0',0);
               }
        case '*':
              return make_node(tokens.T_MUL,'\0',0);
        case '/':
              return make_node(tokens.T_DIV,'\0',0);
        case '>':
        //fseek(lu,cupos+1,SEEK_CUR);
        var th = srccode[loca+1];
        if(th=='='){
                loca=loca+1;    

                   return make_node(tokens.T_GREATEQL,'\0',0);
               }
               else{
                   return make_node(tokens.T_GREATER,'\0',0);
               }
        case '<':
                var th = srccode[loca+1];

               if(th=='='){
                loca=loca+1; 
                   return make_node(tokens.T_LESSEQL,'\0',0);
               }
               else{
                   return make_node(tokens.T_LESS,'\0',0);
               }
        case '&':
                var th = srccode[loca+1];

               if(th=='&'){
                loca=loca+1; 
                   return make_node(tokens.T_LOGIAND,'\0',0);
               }
               else{
                   printf("ERROR OPERATOR DOSENT EXIST");
                   location.reload(); 
               }
        //T_LOGIOR
        case '|':
                var th = srccode[loca+1];
               if(th=='|'){
                   loca=loca+1;    
                   return make_node(tokens.T_LOGIOR,'\0',0);
               }
               else{
                printf("ERROR OPERATOR DOSENT EXIST");
                location.reload(); 
               }
        case ' ':
               return get_token();
        case '\n':
            nl_cnt=nl_cnt+1
                return get_token();




              default:
                printf("ERROR OPERATOR DOSENT EXIST");
                location.reload(); 
        
        }
        
        


}

}