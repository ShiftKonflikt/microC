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
  var len = unsignedLEB128(lis_funcs.length);
  loc_arr.push(... len); //
  for(var i =0 ; i<lis_funcs.length;i++)
  {
  loc_arr.push(0x60); 
  var num_pars = lis_funcs[i].parlen;
  loc_arr.push(...unsignedLEB128(num_pars)); // 
  for(var j =0 ; j<lis_funcs.length;j++){
    loc_arr.push(0x7e); 
  }
  loc_arr.push(0x01);  
  loc_arr.push(0x7e); 
  }
  loc_arr[1] = unsignedLEB128(loc_arr.length - 2); 
  return loc_arr;
}

var import_sec = function(){
  var imp_arr = [];
  imp_arr.push(0x02);
/*
Gotta work on this */

  return imp_arr;
  
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
  func_arr.push(unsignedLEB128(j));
 }
 
 func_arr[1]=unsignedLEB128(func_arr.length - 2);

}
 var gvars_sec = function(){   
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

    }
    var start_sec = function(){
      var stat = -1;
      var start_arr = [];
      for(var k=0;k<lis_funcs.length;k++){
        if(lis_funcs[k].ident == "main"){
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
        start_arr.push(...unsignedLEB128(stat));
        start_arr.push(unsignedLEB128(start_arr.length - 2));
      }
    }
    var code_sec = function(){
    var inst_arr = [];
    
    
    
    }
  var validate_donload = function(){
    var y =Uint8Array.from([
      ...cod_arr,
      
    ]);
     console.log(y);
     console.log( WebAssembly.validate(y));
     downloadBlob(y,'download.wasm', 'application/octet-stream');}






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
  

function gen_code(){
    gen_globals();
    


}
/*
https://blog.kallisti.net.nz/2008/02/extension-to-the-shunting-yard-algorithm-to-allow-variable-numbers-of-arguments-to-functions/
*/