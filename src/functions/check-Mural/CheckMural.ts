export async function getData(idGroup:string){
    const response = await fetch("https://projeto-web-full-stack-pm-devs-production-727d.up.railway.app/murals/" + idGroup, {
    method: "GET",
    headers: {
      "Content-Type": "application/json"
    }
  });
    const Data = await response.json()
    return Data
}  