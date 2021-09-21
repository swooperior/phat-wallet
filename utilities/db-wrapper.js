db = require('../db');

class DBWrapper{

    static getInvID = function(tag){
        var p = new Promise(function(resolve, reject){
            var sql = `SELECT inventory.id FROM users INNER JOIN inventory on users.id = inventory.user_id WHERE users.tag='${tag}';`;
            db.query(
                sql, 
                function(err, rows){                                                
                    if(rows === undefined){
                        reject(new Error("Error rows is undefined"));
                    }else{
                        resolve(rows);
                    }
                }
            )}
        );
            return p.then(function(results){
            return results[0].id;
        })
        .catch(function(err){
            console.log("Promise rejection error: "+err);
        });
    }

    //Helper function
    static async setDaily(tag){
        var user = await this.getUser(tag);
        var p = new Promise(function(resolve, reject){
            var now = new Date();
            var sql = `UPDATE users SET daily_claimed='${now.toISOString().split('T')[0]+' '+ now.toTimeString().split(' ')[0]}' where id = ${user.id}`;
            db.query(
                sql, 
                function(err, rows){
                    console.log                                                
                    if(err == null){
                        resolve(true);
                    }else{
                        reject(new Error(err));
                    }
                }
            )}
        );
        return p.then(function(results){
            return true;
        })
        .catch(function(err){
            console.log("Promise rejection error::\n\n "+err);
            return false;
        });
     
    }

    static getUser = function(tag){
        var p = new Promise(function(resolve, reject){
            var sql = `SELECT * FROM users WHERE users.tag='${tag}';`;
            db.query(
                sql, 
                function(err, rows){                                                
                    if(rows === undefined){
                        reject(new Error("Error rows is undefined"));
                    }else{
                        resolve(rows);
                    }
                }
            )}
        );
            return p.then(function(results){
            return results[0];
        })
        .catch(function(err){
            console.log("Promise rejection error: "+err);
        });
    }
    
    static checkFunds = function(tag){
        var p = new Promise(function(resolve, reject){
            var sql = `SELECT inventory.wallet FROM users INNER JOIN inventory on users.id = inventory.user_id WHERE users.tag='${tag}';`;
            db.query(
                sql, 
                function(err, rows){                                                
                    if(rows === undefined){
                        reject(new Error("Error rows is undefined"));
                    }else{
                        resolve(rows);
                    }
                }
            )}
        );
            return p.then(function(results){
            return results[0].wallet;
        })
        .catch(function(err){
            console.log("Promise rejection error: "+err);
        });
    }

    //Helper function
    static async removeCash(tag, amount){
        var inv_id = await this.getInvID(tag);
        var funds = await this.checkFunds(tag);
        if(funds >= amount){
            var p = new Promise(function(resolve, reject){
                var sql = `UPDATE inventory SET wallet=wallet-${amount} where id = ${inv_id}`;
                db.query(
                    sql, 
                    function(err, rows){
                        console.log                                                
                        if(err == null){
                            resolve(true);
                        }else{
                            reject(new Error(err));
                        }
                    }
                )}
            );
            return p.then(function(results){
                return true;
            })
            .catch(function(err){
                console.log("Promise rejection error::\n\n "+err);
                return false;
            });
        }
    }

    //Helper function
    static async giveCash(tag, amount){
        var inv_id = await this.getInvID(tag);
        console.log("GIVING CASH!");
        var p = new Promise(function(resolve, reject){
            var sql = `UPDATE inventory SET wallet = wallet+${amount} where id = ${inv_id}`;
            db.query(
                sql, 
                function(err, rows){
                    console.log                                                
                    if(err == null){
                        resolve(true);
                    }else{
                        reject(new Error(err));
                    }
                }
            )}
        );
        return p.then(function(results){
            return true;
        })
        .catch(function(err){
            console.log("Promise rejection error: "+err);
            return false;
        });  
    }

    //Helper function
    static async giveExp(tag, amount){
        var user = await this.getUser(tag);
        console.log("GIVING EXP!");
        var p = new Promise(function(resolve, reject){
            var sql = `UPDATE users SET exp = exp+${amount} where id = ${user.id}`;
            db.query(
                sql, 
                function(err, rows){
                    console.log                                                
                    if(err == null){
                        resolve(true);
                    }else{
                        reject(new Error(err));
                    }
                }
            )}
        );
        return p.then(function(results){
            return true;
        })
        .catch(function(err){
            console.log("Promise rejection error: "+err);
            return false;
        });  
    }
      
    /*
    *
    * Registers the user in the database; Should be called onGuildJoin
    */
    static async signUp(tag){
        var sql = `INSERT INTO users(tag) values('${tag}');SET @last_id_in_table1 = LAST_INSERT_ID();INSERT INTO inventory(user_id, wallet) values(@last_id_in_table1, 100);`;
        var msg;
        var p = new Promise(function(resolve, reject){ 
            db.query(sql, async (err,results)=>{
                
                if(err == null){
                    resolve(true);
                }else{
                    reject(new Error(err));
                }
                // if(err){
                //     console.log(err.sqlMessage+'\n\n');
                //     msg = err.sqlMessage;
                // }
            });
        });
        return p.then(function(results){
            return true;
        })
        .catch(function(err){
            console.log("Promise rejection error: "+err);
            return false;
        }); 
    }


    

    /*
    *
    * Transfers the given amount from the sender to the recipient.
    */
    static async transferFunds(sender, recipient, amount){
        var funds = await this.checkFunds(sender);
        
        var check = (funds >= amount);
        console.log(funds);
        console.log(amount);
        console.log(check);
       if(check){
            this.removeCash(sender, parseInt(amount))
            this.giveCash(recipient, parseInt(amount))
            return true;
       }
       return false;
    }
}

module.exports = DBWrapper;