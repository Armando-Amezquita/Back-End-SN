const list = [
    ['edwinm.leonb@gmail.com', 'FT19B'],
]

const checkList = (email)=>{
    list.forEach(e=>{
        if(e[0].toLowerCase() === email.toLowerCase()){
            return e[1]
        }else{
            return false;
        }
    })
}
modules.export = {
    checkList
}