const mongoDb = {
    dbname: 'Dorich',
    user: {
        login: 'CommonUser',
        password: 'jd6-7fS-SMh-peY'
    }
}
export const mongoDbUri = `mongodb+srv://${mongoDb.user.login}:${mongoDb.user.password}@main.fvzm6.mongodb.net/${mongoDb.dbname}?retryWrites=true&w=majority`
export const dropbox = {
    app_key: '0yigcvkvvvrbtf2',
    app_secret: 'od6gpz9gv2frkex',
    token: '8gwt88-F0vcAAAAAAAAAAXz3osFK7ZeTZaopG6AIVy5KUtq9QEFzD1zRvTENwzVP'
}
export const firebase = {
    apiKey: "AIzaSyCvD4pqcejJqPMU7e571ocPj1dphEUBDEg",
    authDomain: "dorich-js.firebaseapp.com",
    projectId: "dorich-js",
    storageBucket: "dorich-js.appspot.com",
    messagingSenderId: "1011414719090",
    appId: "1:1011414719090:web:b738a535d1793aca83c0eb",
    measurementId: "G-1MXXRXSPLJ"
}
