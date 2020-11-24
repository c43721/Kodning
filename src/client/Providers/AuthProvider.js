class AuthProvider {
    static provider = new AuthProvider();

    async signIn() {
        //axios call would go here
    }

    set token() {
        //set token
    }

    get token() {
        return this.token;
    }
}