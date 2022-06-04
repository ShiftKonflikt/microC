var print ={   print: function(a,b){
    if(a==0){
        document.getElementById("compiled").value = document.getElementById("compiled").value + b;
    }
    else{
        document.getElementById("compiled").value = document.getElementById("compiled").value + String.fromCharCode(b);
    }
}
}