export async function getData(idGroup:string){
    const response = await fetch("https://projeto-web-full-stack-pm-devs.onrender.com/murals/" + idGroup, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
    const Data = await response.json()
    return Data
}  