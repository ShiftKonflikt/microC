const print ={   out: function(a,b){
    if(a==0){
        document.getElementById("compiled").value = document.getElementById("compiled").value + b;
    }
    else{
        const myBigInt = BigInt(b);  // `10n` also works
        const myNumber = Number(myBigInt);
        console.log(myNumber)
        document.getElementById("compiled").value = document.getElementById("compiled").value + String.fromCharCode(myNumber);
    }
}
}