class Utils {

	S4 () {
		return (((1+Math.random())*0x10000)|0).toString(16).substring(1);
	}

	uniqueId () {
    return (this.S4() + this.S4() + "-" + this.S4() + "-4" +
    	this.S4().substr(0,3) + "-" + this.S4() + "-" + this.S4() + this.S4() + this.S4()).toLowerCase();
  }
}


module.exports = new Utils();
