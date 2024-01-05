import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

// better approach instead of pasting the documented code 

// is class ko jo bhi use krega usko new  object banana padega is class se tabhi vo sare methods use kr paega so ek better approach ye rahega ki uska object bana ke sidha export krla so usko kuch krna hi ni padega object ko hi import krlo or object par hi sare method lage lagaye hai 

export class AuthService{
    client=new Client();
    account;

    constructor(){
        this.client
            .setEndpoint(conf.appwriteUrl) // Your API Endpoint
            .setProject(conf.appwriteProjectId);    
        this.account=new Account(this.client); 
    }
    // we don't want dependency i.e if in somecase if we have to change the appwrite then we have to change the things everywhere so to overcome this problem we will create methods and in those methods we will call appwrite services so in this we have created a wrapper .the thing is that we don't know anybody's code that we are using appwrite,firebase or any othertech 

    // so we are using promise in documentation so we can either use promise or async fxn and await 
    // that the method we will pass it should give me some values 

    // in the first field we have to pass userID i.e is given in the documentation

    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            // first we check that either this account has been already created i.e exist or not 
            // we are creating a flow that if userAccount exist then login the user simultaneously 
            if(userAccount){  //If anycase i don't want to use this service then we have to change the constrcutor acc. to req.but we don't need to change the async fxn createAccount we are taking the same parameters from the user
                return this.login(email,password); //called login directly we userAccount is already created
                //call annother method
            }
            else{
                return userAccount;
            }
        }
        catch(error){
            throw error;
        }
    }


    async login({email,password}){
        try{
            return await this.account.createEmailSession(email,password);  //use documentation to see the methods 
        }
        catch(error){
            throw error;
        }
    }

    // One fxn is for that i have landed directly on the homepage then i have to know that i am login or not 


    // Note : - by default getCurrentUser and logout that will be implemented by using the sessions 

    async getCurrentUser(){ //no need to pass parameters we can directly ask this by the account method 
        try{
            return await this.account.get();
        }
        catch(error){ //when we don't reach out then on that case this catch will work
            // throw error;
            // for customising error 
            console.log("Appwrite  service :: getCurrentUser :: error",error);
        }
        return null; //if we don't get any value from try catch so to handle the case we return null bcz it can be possible that the error occured can also returanyt value which causes problem in code 
    }

    async logout(){ 
        // we can pass list of strings in session or we can pass list of sessions also 
        try{
            await this.account.deleteSessions(); //to delete all session or we can use deleteSession('current') id in parameter
        }
        catch(error){
            console.log("Appwrite service :: logout :: error",error);
        }

    }
}

const authService=new AuthService();  //new keyword use kr liya hai toh constructor vgera v use krna padega and now we have to create account and client bcz all the methods are applied on the account

// when this object is called then it should be the way that it should  make a client and create account .Also only in that case we should have access of account so we have a method to call when object is instantiated that is constructor

// the object we have created we can directly access all the method by using dot operator 

// the services are created in that way that under the hood only this file knows so the changes that occur in file onwards should occur in this file only but the condition is that we have to use the appropriate parameters that will be given in the documentation



export default AuthService;





// Optimized way to use Authentication Service 