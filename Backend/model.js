(function (module) {
    
    function UserDetails(firstName, lastName) {
        this.firstName = firstName;
        this.lastName = lastName;
        
        this.fullName = function () {
            return firstName + ' ' + lastName;
        };
    }

    function User(id, username) {
        this.id = id;
        this.username = username;
        this.details = new UserDetails();
    }

    if (module) {
        module.exports = {
            User: User,
            UserDetails: UserDetails
        };
    }

})(module);