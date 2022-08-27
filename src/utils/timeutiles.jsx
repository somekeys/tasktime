export function nowformat(mills) {
    var text = "";
    text += Math.floor(mills / (1000 * 60 * 60)) + "h";
    text += Math.floor(mills % (1000 * 60 * 60) / (1000 * 60)) + "m";
    text += Math.floor(mills % (1000 * 60 * 60) % (1000 * 60) / (1000)) + "s";
    return text;
  
  
  }
  
export function timeformat(xxt,zo) {
    let myzo = new Date().getTimezoneOffset();
    var kn = new Date(xxt-(-myzo+zo)*60000);
    return kn.toString().substring(0, 25);
  
  }