export default async function checkValidUser(email, password) {

    var currentUser = { userEmail: "", userPassword: "" }

    fetch("https://webstore-backend-theta.vercel.app/api/getUsers")
        .then((response) => response.json())
        .then((data) => {

            return false
        });

    if (email == currentUser.userEmail && password == currentUser.userPassword) {
        return true
    }
    return false

}