let session = {};

exports.viewlocalStorage = () =>{
    return session;
}

exports.setItem = (key, value) => {
    session[key] = value;
}

exports.getItem = (key) => {
    return session[key];
}

exports.clear = () => {
    session = {};
    console.log(this.session);
}
