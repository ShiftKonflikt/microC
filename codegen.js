// hello there if you are looking at this code forgive me this code is done in a hurry dosent have proper passes and edge cases ,hey im still learning T_ 
//this code-gen is done directly from source there is no IR to speak of (maybe in future projecs :) ) 


var cod_arr=[0x00, 0x61, 0x73, 0x6d,0x01, 0x00, 0x00, 0x00]

var num_mut=[0x01,0x7E];

var downloadBlob, downloadURL;

function gen_globals(){


var type_sec = function(){
  var loc_arr = [];
  if(lis_funcs == []){
    return [];
  }
  loc_arr.push(0x01); 
  loc_arr.push(0x00); 
  //lis_funcs.length
  var len = unsignedLEB128(lis_funcs.length + 1);
  //console.log(lis_funcs.length + 1);
  loc_arr.push(... len); //
 // console.log(loc_arr);
  loc_arr.push(0x60); 
  loc_arr.push(0x02); 
  loc_arr.push(0x7e); 
  loc_arr.push(0x7e); 
  loc_arr.push(0x00);
  for(var i =0 ; i<lis_funcs.length;i++)
  {
  loc_arr.push(0x60); 
  var num_pars = lis_funcs[i].parlen;
  loc_arr.push(...unsignedLEB128(num_pars)); //

  for(var j =0 ; j<num_pars;j++){
    loc_arr.push(0x7e); 
  }
  if(lis_funcs[i].type != tokens.T_VOID){
  loc_arr.push(0x01);  
  loc_arr.push(0x7e); }
  else{
    loc_arr.push(0x00);  

  }
  }
 // loc_arr[1] = unsignedLEB128(loc_arr.length - 2); 
 var tem = loc_arr[0];
  return [
       tem,
    ...unsignedLEB128(loc_arr.length - 2),
    ...loc_arr.slice(2,)
    
  ];
}

var import_sec = function(){
  var imp_arr = [];
  imp_arr.push(0x02);
  imp_arr.push(0x00);
  imp_arr.push(0x01);
  imp_arr.push(0x05);
  imp_arr.push(0x70);
  imp_arr.push(0x72);
  imp_arr.push(0x69);
  imp_arr.push(0x6E);
  imp_arr.push(0x74);
  imp_arr.push(0x03);
  imp_arr.push(0x6F);
  imp_arr.push(0x75);
  imp_arr.push(0x74);
  imp_arr.push(0x00);
  imp_arr.push(0x00);
 // console.log(imp_arr)
  //imp_arr[1] = unsignedLEB128(imp_arr.length - 2); 
  var tem = imp_arr[0];
  return    [
       tem,
    ...unsignedLEB128(imp_arr.length - 2),
    ...imp_arr.slice(2,)
    
  ];
  
}
var func_sec = function(){
 var func_arr =[];
 if(lis_funcs == []){
  return [];
}
 func_arr.push(0x03);
 func_arr.push(0x00);
 func_arr.push(...unsignedLEB128(lis_funcs.length));
 for(var j =0 ; j<lis_funcs.length;j++){
  func_arr.push(...unsignedLEB128(j+1));
 }
 
 //func_arr[1]=unsignedLEB128(func_arr.length - 2);
 var tem = func_arr[0];
 return    [
     tem,
  ...unsignedLEB128(func_arr.length - 2),
  ...func_arr.slice(2,)
  
];
}
/* var gvars_sec = function(){   
    cod_arr.push(0x06);
    //console.log(cod_arr.length,cod_arr);
    var size=global_vars.length;
    
    cod_arr.push((size*5)+1);

    cod_arr.push(size);
    //console.log(global_decls.length);
    //cod_arr.push(0x02);
    for(var i=0;i<size;i++){
     cod_arr.push(0x7E);
     cod_arr.push(0x01);
     cod_arr.push(0x42);
     cod_arr.push(0x00);
     cod_arr.push(0x0B);
        
    }
    //console.log(cod_arr.length);

    }*/
    var start_sec = function(){
      var stat = -1;
      var start_arr = [];
      for(var k=0;k<lis_funcs.length;k++){
        if(lis_funcs[k].ident == "main"){
          //console.log(lis_funcs[k])
          stat =k;
          break;

        }
      }
      if(stat == -1){
        return [];
      }
      else{
        start_arr.push(0x08);
        start_arr.push(0x00);
        start_arr.push(...unsignedLEB128(stat+1));
        //start_arr.push(...unsignedLEB128(start_arr.length - 2));
        var tem = start_arr[0];
        return    [
             tem,
          ...unsignedLEB128(start_arr.length - 2),
          ...start_arr.slice(2,)
          
        ];
      }
    }
    var code_sec = function(){
    var inst_arr = [];
    if(lis_funcs == []){
      return [];
    }
    inst_arr.push(0x0a);
    inst_arr.push(0x00);
    inst_arr.push(...unsignedLEB128(lis_funcs.length));
    for(var i =0;i<lis_funcs.length;i++){
      var bod=[]
      bod.push(0x00);
      bod.push(0x00); // fix local variables later
      for(var j =0;j<lis_funcs[i].body.length;j++){
         if(lis_funcs[i].body[j].node_type==nodes.out_node){
          var par0 = lis_funcs[i].body[j].a;
          var par1 = lis_funcs[i].body[j].b;
          //console.log(lis_funcs[i].body[j])
          /*to do 2 i64 const and call function at index 0 */
          bod.push(0x42);
          bod.push(par0);
          bod.push(0x42);
          bod.push(par1);
          bod.push(0x10);
          bod.push(0x00);
         }
      }
      /* adding explicit return statements rn */
      
      bod.push(0x0b);
     // bod[1] = unsignedLEB128( bod.length() -1 );
      inst_arr.push(...unsignedLEB128( bod.length -1 ),
        ...bod.slice(1,)
        );
    }
    var tem = inst_arr[0];
    return    [
         tem,
      ...unsignedLEB128(inst_arr.length - 2),
      ...inst_arr.slice(2,)
      
    ];
    
    
    
    }



var x = type_sec();
if(x != []){
  cod_arr = [
    ...cod_arr,
    ...x
  ]
}
var y = import_sec();
if(x != []){
  cod_arr = [
    ...cod_arr,
    ...y
  ]
}
var z = func_sec();
if(x != []){
  cod_arr = [
    ...cod_arr,
    ...z
  ]
}
// GLOBAL VARIABLES SECTION TO BE ADDED
var a = start_sec();
if(x != []){
  cod_arr = [
    ...cod_arr,
    ...a
  ]
}
var b = code_sec();
if(x != []){
  cod_arr = [
    ...cod_arr,
    ...b
  ]
}

}


/*
I yoinked both downloadBlob and downloadURL from stack overflow answer from stefan (https://stackoverflow.com/users/574576/stefan)

https://stackoverflow.com/questions/25354313/saving-a-uint8array-to-a-binary-file

thank you */

downloadBlob = function(data, fileName, mimeType) {
    var blob, url;
    blob = new Blob([data], {
      type: mimeType
    });
    url = window.URL.createObjectURL(blob);
    downloadURL(url, fileName);
    setTimeout(function() {
      return window.URL.revokeObjectURL(url);
    }, 1000);
  };
  
  downloadURL = function(data, fileName) {
    var a;
    a = document.createElement('a');
    a.href = data;
    a.download = fileName;
    document.body.appendChild(a);
    a.style = 'display: none';
   //a.click();
    a.remove();
  };
  
  var validate_donload = function(){
    var y =Uint8Array.from([
      ...cod_arr,
      
    ]);
     console.log(y);
     console.log( WebAssembly.validate(y));
     downloadBlob(y,'download.wasm', 'application/octet-stream');}
function DOWNLOAD(){
      validate_donload();
     }
function RUN(){
  var y =Uint8Array.from([
    ...cod_arr,
    
  ]);
  try {
  const instance =  WebAssembly.instantiate(y,{
     print : {   out: function(a,b){
      if(a==0){
          document.getElementById("compiled").value = document.getElementById("compiled").value + b;
      }
      else{
        console.log(b.type)
        document.getElementById("compiled").value = document.getElementById("compiled").value + String.fromCharCode(b);
      }
  }
  }

  });}
  catch(err){
    console.log(err)
  }
}
function gen_code(){
    gen_globals();
    document.getElementById("run").style.visibility = "visible";
    document.getElementById("DOWNLOAD").style.visibility = "visible";

}
/*
https://blog.kallisti.net.nz/2008/02/extension-to-the-shunting-yard-algorithm-to-allow-variable-numbers-of-arguments-to-functions/
*/