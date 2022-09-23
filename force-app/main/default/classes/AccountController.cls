public with sharing class AccountController {
    public AccountController() {

    }
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(){
        return [select id,name,phone,type,industry from Account LIMIT 10];
    }
    @AuraEnabled
    public static List<Account> getAccountRecordsList(){
        return [select id,name,type,phone,industry from Account LIMIT 10];
    }
 }