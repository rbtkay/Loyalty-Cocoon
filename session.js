import React from 'react';

class Session {
    username = '';
    email = '';
    id = '';

    setSession(username, email, id) {
        this.username = username;
        this.email = email;
        this.id = id;
    }

    viewSession() {
        return { username, email, id };
    }
}

export default Session;