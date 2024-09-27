const { element } = require("protractor")

describe('Protector App', function () {
    var user = element(by.model('login'))
    var password = element(by.model('password'))

    var loginBtn = element(by.id('login-btn-test'))

    function logIn(user, password) {
        user.sendKeys(user)
        password.sendKeys(password)
        loginBtn.click()
    }

    

})