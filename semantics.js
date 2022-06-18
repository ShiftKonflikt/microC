// hello there if you are looking at this code forgive me this code is done in a hurry dosent have proper passes that you would expect from a compiler
// and it is riddled with edge cases ,hey im still learning T_ 
var global_decls = []
var global_vars = [];
var lis_funcs = []

//i should be using hash table but imma do quick and dirty way for now

function add_decl(ob){
    
    var j =global_decls.length;
    if(j==0){
        if(ob.node_type == nodes.Glob_var ){
            global_vars.push(ob);
        }
        else if(ob.node_type == nodes.Func_decl ){
         //   console.log("yes")
            lis_funcs.push(ob);
        }
       // global_decls.push(ob);
    }
    else{
    for(var i=0;i<j;i++){
        
        if(global_decls[i].ident==ob.ident){
            alert("re-decleration is illegal");
        }
        else{
            global_decls.push(ob);
            if(ob.node_type == nodes.Glob_var ){
                global_vars.push(ob);
            }
            else if(ob.node_type == nodes.Func_decl ){
               // console.log("yes")
                lis_funcs.push(ob);
            }
            //console.log("yes",global_decls);
        }
        
  
    }
}
//console.log(lis_funcs)
}

function check_lvars(j,k){
    for( var i =0;i<j.length;i++){
        for( var m =0;m<k.length;m++){
                  if(k[m].ident == i.ident){
                    alert("re-decleration is illegal");
                  }
        }
    }
    for( var i =0;i<k.length;i++){
        for( var m =0;m<k.length;m++){
            if(k[m].ident == i.ident){
                alert("re-decleration is illegal");
              }
        }
    }
}



function semantic_(xi){
  //  console.log("x")
    add_decl(xi);

    
}