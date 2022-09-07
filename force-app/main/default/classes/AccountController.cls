public with sharing class AccountController {
    public AccountController() {

    }
    @AuraEnabled(cacheable = true)
    public static List<Account> getAccounts(){
        return [select id,name,type,industry from Account LIMIT 10];
    }
}