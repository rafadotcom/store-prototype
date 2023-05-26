
export default async function handler() {

    fetch("https://webstore-backend-theta.vercel.app/api/getUsers")
        .then((response) => response.json())
        .then((data) => {

            return data.data
        });
    return null

}