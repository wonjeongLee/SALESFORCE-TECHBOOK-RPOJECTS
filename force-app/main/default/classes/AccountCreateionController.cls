public with sharing class AccountCreateionController {
    public AccountCreateionController() {

    }
    @AuraEnabled
    public static Account createAccount(Account accountRecObj){
        try {
            insert accountRecObj;
            return accountRecObj;
        } catch (Exception ex) {
            throw new AuraHandledException(ex.getMessage());
        }
    }
    @AuraEnabled
    public static List<Account> createAccounts(List<Account> accountList){
        insert accountList;
        return accountList;        
    }
}
